import React from 'react'
import { FaComment, FaEllipsisH, FaHeart, FaPaperPlane } from 'react-icons/fa';
import img1 from '../../assets/R.jfif'

const Posts = () => {
  return (
    <div className='post'>
      <div className='postHead'>
        <div className='postHeadSm'>
          <img className='pImg' src={img1} alt="" />
          <p>Wayne Rooney</p>
        </div>
        <FaEllipsisH />
      </div>
      <img className='postImg' src={img1} alt="" />
      <div className="postIcons">
        <FaHeart className='postIcon'/>
        <FaComment className='postIcon'/>
        <FaPaperPlane className='postIcon'/>
      </div>
    </div>
  )
}

export default Posts;