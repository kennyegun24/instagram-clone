import { Col, Row } from 'antd'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/context'
import { PostCountContext } from '../../context/postsCounts'
import { StatusContext } from '../../context/status'
import { db } from '../../firebase'
import PostsProfileDisplay from './postsProfileDisplay'

const ProPosts = () => {
  const [images, setImages] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dischargePosts } = useContext(PostCountContext)
  const { progress } = useContext(StatusContext)


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
      {images && images.length === 0 &&
        <div className='centertxt'>
          <p>No posts yet...</p>
        </div>
      }
      <Row className='rub' gutters={[32, 32]} style={{ filter: progress.status && 'blur(5px)' }}>
        {images.length !== 0 && images.sort((a, b) => b.date - a.date).map((images) => (
          <Col xs={24} sm={12} lg={6} key={images.id}>
            <PostsProfileDisplay images={images} />
          </Col>
        ))}
      </Row>
    </div >
  )
}

export default ProPosts;