import React from 'react'
import img from '../../assets/R.jfif'

const Message = () => {
  return (
    <div className='msgCnts'>
      <div className='msgPrv'>
        <img src={img} className='pImg2' alt="" />
        <div>
          <p>Jon Snow</p>
          <p className='lstmsg'>Hey there</p>
        </div>
      </div>
    </div>
  )
}

export default Message