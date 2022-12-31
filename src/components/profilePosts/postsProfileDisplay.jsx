import React, { useContext } from 'react'
import { StatusContext } from '../../context/status';

const PostsProfileDisplay = ({ images }) => {
  const { progress } = useContext(StatusContext)

  return (
    <div>
      <div className='profPostDiv' style={{ filter: progress.status && 'blur(5px)' }}>
        <div>
          <img src={images.img} alt="" className='imgPostProf' />
        </div>
      </div>
    </div>
  )
}

export default PostsProfileDisplay;