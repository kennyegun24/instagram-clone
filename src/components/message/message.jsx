import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'
import { HideAndShow } from '../../context/HideShow'
import { db } from '../../firebase'

const Message = () => {

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  const [users, setUsers] = useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userchat", currentUser.uid), (doc) => {
        setUsers(doc.data())
      });
      return () => {
        unsub()
      };
    };
    currentUser.uid && getChats()
  }, [currentUser.uid]);
  const mapp = users && (Object.entries(users))

  const [hide, setHide] = useState(false)
  const { hideShow } = useContext(HideAndShow)

  const handleClick = () => {
    if (hide === false) {
      setHide(true)
      hideShow({ type: 'hide', payload: true })
    } else {
      setHide(false)
      hideShow({ type: 'hide', payload: hide })
    }
  }

  const handleSelect = (u) => {
    handleClick()
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (
    <div>
      {mapp && mapp.length !== 0 && mapp.map((chat) => {
        return (
          <div className={`msgCnts flex column borderBottom `} onClick={() => handleSelect(chat[1].userInfo)} key={chat[1].userInfo.uid}>
            <div className='msgPrv flex gap alit pointer' >
              <img src={chat[1].userInfo.photoURL} className='pImg2' alt="" />
              <div>
                <p>{chat[1].userInfo.displayName}</p>
                <p className='or'>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Message;