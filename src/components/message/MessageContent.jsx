import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'
import moment from 'moment'
import { MessagesContext } from '../../context/messages'

const MessageContent = () => {
  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)
  const { mssg } = useContext(MessagesContext)
  const smoothSlide = useRef();

  useEffect(() => {
    smoothSlide.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mssg])

  return (
    <div>
      {mssg.message !== 'null' && mssg.message.length !== 0 ? mssg.message.map((mssg) => {
        if (moment(mssg.time).fromNow().includes('minutes') || moment(mssg.time).fromNow().includes('seconds')) {
        } else {
        }

        const checkTimeFormat = moment(mssg.time).fromNow().includes('minutes') || moment(mssg.time).fromNow().includes('seconds') || moment(mssg.time).fromNow().includes('minute')
        return (
          <div className='' ref={smoothSlide} key={mssg.id}>
            <div className={`chatCnt flex gap ${mssg.senderId === currentUser.uid && "chatCnt2"}`}>
              <img src={mssg.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" className='pImg' />
              <div className='flex gapSm column end'>
                <p className="chat poppins">
                  {mssg.text}
                </p>
                <p className='chatTime'>
                  {checkTimeFormat ? moment(mssg.time).fromNow() : mssg.time}
                </p>
              </div>
            </div>
          </div>
        )
      })
        :
        <div>
          <p className='centertxt'>
            No chats
          </p>
        </div>
      }

    </div>

  )
}

export default MessageContent