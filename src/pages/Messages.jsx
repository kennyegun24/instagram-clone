import React, { useContext, useEffect } from 'react'
import Message from '../components/message/message'
import MessageContent from '../components/message/MessageContent'
import { AuthContext } from '../context/context'
import MsgInp from '../components/message/MsgInp'
import { ChatContext } from '../context/chatsContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { MessagesContext } from '../context/messages'

const Messages = () => {
  const { currentUser } = useContext(AuthContext)
  const { dischargeMessages } = useContext(MessagesContext)

  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && dischargeMessages({ type: 'messages', payload: doc.data().messages })
    })
    return () => {
      unSub()
    }
  }, [data.chatId, dischargeMessages])

  return (
    <div className='msg flex'>
      <div className='msgCnt'>
        <p className='myName'>{currentUser ? currentUser.displayName : 'nan'}</p>
        <div className="msgBg">
          <Message />
        </div>
      </div>

      <div className='msgCnt2'>
        <div className='flex gap alit msgHead'>
          <img src={data.user?.photoURL} className='pImg' alt="" />
          <div>
            <p>
              {data.user?.displayName}
            </p>
          </div>
        </div>

        <div className='msgBgs'>
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