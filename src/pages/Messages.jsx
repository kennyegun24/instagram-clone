import React, { useContext, useEffect, useState } from 'react'
import Message from '../components/message/message'
import MessageContent from '../components/message/MessageContent'
import { AuthContext } from '../context/context'
import MsgInp from '../components/message/MsgInp'
import { ChatContext } from '../context/chatsContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { MessagesContext } from '../context/messages'
import { HideAndShow } from '../context/HideShow'
import { IoMdArrowRoundBack } from 'react-icons/io'

const Messages = () => {
  const { currentUser } = useContext(AuthContext)
  const { dischargeMessages } = useContext(MessagesContext)
  const { hide } = useContext(HideAndShow)

  const { data } = useContext(ChatContext)
  const { hideShow } = useContext(HideAndShow)

  const [Hide, setHide] = useState(true)
  const remHide = () => {
    if (Hide === true) {
      setHide(false)
      hideShow({ type: 'hide', payload: false })
      dischargeMessages({ type: 'messages', payload: 'null' })
    }
    else {
      setHide(true)
      hideShow({ type: 'hide', payload: true })
    }
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && dischargeMessages({ type: 'messages', payload: doc.data().messages })
    })
    return () => {
      unSub()
    }
  }, [data.chatId, dischargeMessages])

  const body = document.querySelector('body')
  const headNav = body.querySelector('.headNav')
  const postHead = body.querySelector('.postHead')
  if (headNav instanceof HTMLElement && postHead instanceof HTMLElement && window.innerWidth < 767) {
    headNav.classList.add('show')
  }

  return (
    <div className='msg flex'>
      <div className={`${hide.prop ? 'hideMsg msgCnt' : 'msgCnt'}`}>
        <div className='msgHead'>
          <p className='myName'>{currentUser ? currentUser.displayName : 'nan'}</p>
        </div>
        <div className="msgBg">
          <Message />
        </div>
      </div>

      <div className='msgCnt2'>
        <div className='flex gap alit msgHead'>
          <div className='hideIcon' onClick={remHide}>
            <IoMdArrowRoundBack />
          </div>
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