import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { FaComment, FaEllipsisH, FaHeart, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../context/context';
import { PostCountContext } from '../../context/postsCounts';
import { db } from '../../firebase';

const Posts = () => {
  const [finalPosts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dischargePosts } = useContext(PostCountContext)

  const getArray1 = async () => {
    let arr2 = [];
    const snapshotPromise = new Promise((resolve) => {
      onSnapshot(doc(db, "posts", currentUser.uid), (doc) => {
        arr2.push(doc.data().posts);
        resolve();
        const arr = []
        const postsLength = doc.data().posts
        postsLength.forEach(({ id }) => {
          arr.push(id)
        })
        dischargePosts({ type: 'countposts', payload: arr.length })
      });
    });

    await snapshotPromise;
    console.log(arr2)
    return arr2;
  }

  const getArray2 = async () => {
    const res = await getDoc(doc(db, "following", currentUser.uid));
    const response = res.data();
    const follow = response.follow;
    let arr = [];
    arr.push(follow);
    const arr3 = arr.flat();
    let arr4 = [];
    arr3.forEach(({ id }) => {
      arr4.push(id);
    });
    let arr2 = [];

    const snapshotPromises = arr4.map((id) => {
      return new Promise((resolve) => {
        onSnapshot(doc(db, "posts", id), (doc) => {
          arr2.push(doc.data().posts);
          resolve();
        });
      });
    });

    await Promise.all(snapshotPromises);
    console.log(arr2);
    return arr2;
  }

  /* eslint-disable */
  useEffect(() => {
    const joinArrays = async () => {
      const [array1, array2] = await Promise.all([getArray1(), getArray2()]);
      const combinedArray = [...array1, ...array2];
      setPosts(combinedArray.flat());
    }

    return () => {
      joinArrays()
    }
  }, [])

  return (
    <div>
      {finalPosts.length === 0 &&
        <div className='centertxt'>
          <p>No posts yet...</p>
        </div>
      }

      <div>
        {finalPosts.length !== 0 && finalPosts.sort((a, b) => b.date - a.date).map((images) => {
          return (

            <div className='post flex column' key={images.id}>
              <div className='postHead flex alit'>
                <div className='postHeadSm flex alit gap'>
                  <img className='pImg' src={images.photoURL} alt="" />
                  <p>{images.name}</p>
                </div>
                <FaEllipsisH />
              </div>
              <img className='postImg' src={images.img} alt="" />
              <div className="postIcons gap flex alit">
                <FaHeart className='postIcon' />
                <FaComment className='postIcon' />
                <FaPaperPlane className='postIcon' />
              </div>
              {images.text && <p className='postText poppins' >{images.text}</p>}
              <div>
                <p className='postText poppins or'>{images.newDate}</p>
                <p className='postText poppins or'>{images.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Posts;