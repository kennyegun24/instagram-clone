import { Col, Row } from 'antd'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/context'
import { PostCountContext } from '../../context/postsCounts'
import { db } from '../../firebase'
import PostsProfileDisplay from './postsProfileDisplay'

const ProPosts = () => {
  const [images, setImages] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dischargePosts } = useContext(PostCountContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "posts", currentUser.uid), (doc) => {
      doc.exists() && setImages(doc.data().posts)
      const arr = []
      const postsLength = doc.data().posts
      postsLength.forEach(({ id }) => {
        arr.push(id)
      })
      dischargePosts({ type: 'countposts', payload: arr.length })
    })
    return () => {
      unSub()
    }
  }, [currentUser.uid, dischargePosts])

  return (
    <div>
      {images.length === 0 &&
        <div className='centertxt'>
          <p>No posts yet...</p>
        </div>
      }
      <Row gutters={[32, 32]}>
        {images && images.map((images) => (
          <Col xs={24} sm={12} lg={6}>
            <PostsProfileDisplay images={images} key={images.id} />
          </Col>
        ))}
      </Row>
    </div >
  )
}

export default ProPosts