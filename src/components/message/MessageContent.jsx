import React from 'react'
import img from '../../assets/R.jfif'

const MessageContent = () => {
  return (
    <div className=''>
      <div className="chatCnt gap">
        <img src={img} alt="" className='pImg' />
        <p className="chat">
          Hey there
        </p>
      </div>
      <div className="chatCnt2 gap">
        <img src={img} alt="" className='pImg' />
        <p className="chat">
          Hey there
        </p>
      </div>
    </div>
  )
}

export default MessageContent