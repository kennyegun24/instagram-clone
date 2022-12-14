import { uuidv4 } from '@firebase/util'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context/chatsContext'
import { AuthContext } from '../../context/context'
import { db } from '../../firebase'

const MsgInp = () => {

  const [text, setText] = useState('')

  const { data } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext)

  const date = new Date();

  const dateString = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  const handleSend = async (e) => {
    e.preventDefault()

    if (text !== '') {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          time: dateString
        })
      })

      await updateDoc(doc(db, "userchat", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })

      await updateDoc(doc(db, "userchat", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp()
      })
      setText('')
    }
  }

  return (
    <form className='form flex alit column' onSubmit={handleSend}>
      <input value={text} type="text" className='input' onChange={(e) => setText(e.target.value)} />
    </form>
  )
}

export default MsgInp