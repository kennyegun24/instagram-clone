import React, { useContext } from 'react'
import Message from '../components/message/message'
import MessageContent from '../components/message/MessageContent'
import { AuthContext } from '../context/context'
import img from '../assets/R.jfif'
import MsgInp from '../components/message/MsgInp'

const Messages = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='msg'>
      <div className='msgCnt'>
        <p className='myName'>{currentUser ? currentUser.displayName : 'nan'}</p>
        <div className="msgBg">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>

      <div className='msgCnt2'>
        <div className='flex gap alit msgHead'>
          <img src={img} className='pImg' alt="" />
          <div>
            <p>
              Jon Snow
            </p>
          </div>
        </div>
        <div className='msgBgs'>
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
          <MessageContent />
        </div>
        <div className="inp">
          <div>
            <MsgInp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages