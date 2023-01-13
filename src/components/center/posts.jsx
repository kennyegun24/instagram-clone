import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaComment, FaEllipsisH, FaHeart, FaPaperPlane } from 'react-icons/fa';
import { AuthContext } from '../../context/context';
import { PostCountContext } from '../../context/postsCounts';
import { db } from '../../firebase';
import moment from 'moment'

const Posts = () => {
  const [finalPosts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext)
  const [prog, setProg] = useState(true)
  // const { data } = useContext(Chatc)
  const { dischargePosts } = useContext(PostCountContext)

  const getArray1 = useCallback(async () => {
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
    return arr2;
  }, [currentUser.uid, dischargePosts])

  const getArray2 = useCallback(async () => {
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

    return arr2;
  }, [currentUser.uid])


  const joinArrays = useCallback(async () => {
    const [array1, array2] = await Promise.all([getArray1(), getArray2()]);
    const combinedArray = [...array1, ...array2];
    setPosts(combinedArray.flat());
    setProg(false)
  }, [getArray1, getArray2])

  useEffect(() => {
    joinArrays()
    console.log(joinArrays())
  }, [joinArrays, getArray1, getArray2])

  const body = document.querySelector('body')
  const headNav = body.querySelector('.headNav')
  const postHead = body.querySelector('.centerAnimation')
  if (body && postHead && window.innerWidth < 767) {
    headNav.classList.remove('show')
  }

  return (
    <div>
      {
        prog ? (
          <div className='centerAnimation'>
            <div className="animationCard">
              <div className="animationWrapper">
                <div className="animationImg"></div>
                <div className="animationHead">
                  <span>
                    <p></p>
                  </span>
                </div>
              </div>
              <div className="animationHead2">
                <div>
                  <p></p>
                </div>
              </div>
            </div>

            <div className="animationCard">
              <div className="animationWrapper">
                <div className="animationImg"></div>
                <div className="animationHead">
                  <span>
                    <p></p>
                  </span>
                </div>
              </div>
              <div className="animationHead2">
                <div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='showPost'>
            {finalPosts.length === 0 &&
              <div className='centertxt'>
                <p>No posts yet...</p>
              </div>
            }

            <div className='showPost'>
              {
                finalPosts.length !== 0 && finalPosts.sort((a, b) => b.date - a.date).map((images) => {
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
                      <div className='postText'>
                        {images.text &&
                          <div className='flex alit gapSm2 marginBtm'>
                            <img className='postDisplayImg' src={images.img} alt=''></img>
                            <p className='poppins fntMd'>{images.text}</p>
                          </div>
                        }
                        <div>
                          <p className=' poppins or'>{moment(images.time).fromNow()}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Posts;