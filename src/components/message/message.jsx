import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import img from '../../assets/R.jfif'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'
import { db } from '../../firebase'

const Message = () => {

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)

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
  const mapp = (Object.entries(users))

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  console.log(mapp)
  return (
        <div className=''>
          {mapp.length !== 0 ? mapp.map((chat) => {
            return (
              <div className="msgCnts flex column borderBottom" onClick={() => handleSelect(chat[1].userInfo)}>
                <div className='msgPrv flex gap alit' key={chat[1].userInfo.uid}>
                  <img src={chat[1].userInfo.photoURL} className='pImg2' alt="" />
                  <div>
                    <p>{chat[1].userInfo.displayName}</p>
                    <p className='lstmsg'>{chat[1].lastMessage?.text}</p>
                  </div>
                </div>
              </div>
            )
          }) : <p className='middle flex alit'>No Recent Chat</p>}
        </div>
  )
}

export default Message;