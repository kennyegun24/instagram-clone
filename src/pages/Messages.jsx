import React, { useContext, useEffect, useState } from 'react'
import Message from '../components/message/message'
import MessageContent from '../components/message/MessageContent'
import { AuthContext } from '../context/context'
import img from '../assets/R.jfif'
import MsgInp from '../components/message/MsgInp'
import { ChatContext } from '../context/chatsContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const Messages = () => {
  const {currentUser} = useContext(AuthContext)

  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })
    return () => {
      unSub()
    }
  }, [data.chatId])
  console.log(messages)

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
          <img src={data.user ?.photoURL} className='pImg' alt="" />
          <div>
            <p>
              {data.user ?.displayName}
            </p>
          </div>
        </div>

        <div className='msgBgs'>
        {messages.length !== 0 ? (messages.map((message) => (
            <MessageContent message={message}/>
          ))): <p>No chats</p>}
        </div>

        <div className="inp">
          <div>
            <MsgInp />
          </div>
        </div>
      </div>
    </div>
  )
  // console.log(messages)

}

export default Messages