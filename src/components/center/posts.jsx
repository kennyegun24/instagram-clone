import React from 'react'
import { FaComment, FaEllipsisH, FaHeart, FaPaperPlane } from 'react-icons/fa';
import img1 from '../../assets/R.jfif'

const Posts = () => {
  return (
    <div className='post flex column'>
      <div className='postHead flex alit'>
        <div className='postHeadSm flex alit gap'>
          <img className='pImg' src={img1} alt="" />
          <p>Wayne Rooney</p>
        </div>
        <FaEllipsisH />
      </div>
      <img className='postImg' src={img1} alt="" />
      <div className="postIcons gap flex alit">
        <FaHeart className='postIcon'/>
        <FaComment className='postIcon'/>
        <FaPaperPlane className='postIcon'/>
      </div>
    </div>
  )
}

export default Posts;