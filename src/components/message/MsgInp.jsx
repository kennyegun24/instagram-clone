import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'
import { db } from '../../firebase'

const MsgInp = () => {

  const [text, setText] = useState('')

  const {data} = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  const handleSend = async (e) => {
    e.preventDefault()

    if(!text == '') {
      await updateDoc(doc( db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId:currentUser.uid,
          date: Timestamp.now()
        })
      })

      await updateDoc(doc(db, "userchat", currentUser.uid), {
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
  
      await updateDoc(doc(db, "userchat", data.user.uid), {
        [data.chatId + ".lastMessage"]:{
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
      setText('')
    }
  }
  console.log(text)

  return (
    <form className='form flex alit column' onSubmit={handleSend}>
        <input value={text} type="text" className='input' onChange={(e) => setText(e.target.value)}/>
    </form>
  )
}

export default MsgInp