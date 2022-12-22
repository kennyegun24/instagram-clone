import React, { useContext, useEffect, useRef } from 'react'
import img from '../../assets/R.jfif'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'

const MessageContent = ({message}) => {
  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)
  const smoothSlide = useRef();

  useEffect(()=>{
    smoothSlide.current?.scrollIntoView({ behavior: 'smooth'});
  },[message]);

  return (
    <div className='' ref={smoothSlide}>
      <div className={`chatCnt flex alit gap ${message.senderId === currentUser.uid && "chatCnt2"}`}>
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" className='pImg' />
        <p className="chat">
          {message.text}
        </p>
      </div>
    </div>
  )
}

export default MessageContent