import React from 'react'

const SecUserPosts = ({ images }) => {
  return (
    <div>
      <div className='profPostDiv'>
        <div>
          <img src={images.img} alt="" className='imgPostProf' />
        </div>
      </div>
    </div>
  )
}

export default SecUserPosts;