import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { PostCountContext } from '../../context/postsCounts'
import { UserContext } from '../../context/searchUser'
import { db } from '../../firebase'
import SecUserPosts from './SecUserPosts'

const SecUserProPosts = () => {
  const [images, setImages] = useState([])
  const { data } = useContext(UserContext)
  const { dischargePosts } = useContext(PostCountContext)
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "posts", data.user.uid), (doc) => {
      doc.exists() && setImages(doc.data().posts)
      const arr = []
      const postsLength = doc.data().posts
      postsLength.forEach(({ id }) => {
        arr.push(id)
      })
      // arr.push(postsLength)
      dischargePosts({ type: 'countposts', payload: arr.length })
    })
    return () => {
      unSub()
    }
  }, [dischargePosts, data.user.uid])

  return (
    <div>
      {images.length === 0 &&
        <div className='centertxt'>
          <p>No posts yet...</p>
        </div>}
      <div className='grid'>
        {images && images.map((images) => (
          <SecUserPosts images={images} key={images.id} />
        ))}
      </div>
    </div>
  )
}

export default SecUserProPosts;
