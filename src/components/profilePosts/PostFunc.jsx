import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import { AuthContext } from '../../context/context'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase'

const PostFunc = () => {

  const [img, setImg] = useState(null)
  const [text, setTxt] = useState("")
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handlePost = async (e) => {
    e.preventDefault()
    if (text !== '' && img !== null) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "posts", currentUser.uid), {
            posts: arrayUnion({
              name: currentUser.displayName,
              id: uuid(),
              date: Timestamp.now(),
              img: downloadURL,
              photoURL: currentUser.photoURL,
              text: text,
              time: new Date(Date.now()).toLocaleTimeString(),
              newDate: new Date(Date.now()).toLocaleDateString(),
            })
          });
        })
      })
      setImg(null)
      setTxt('')
    }
    if (img !== null && text === '') {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "posts", currentUser.uid), {
            posts: arrayUnion({
              name: currentUser.displayName,
              id: uuid(),
              date: Timestamp.now(),
              time: new Date(Date.now()).toLocaleTimeString(),
              newDate: new Date(Date.now()).toLocaleDateString(),
              img: downloadURL,
              photoURL: currentUser.photoURL,
            })
          });
        })
      })
      setImg(null)
    }
    if (img === null && text !== '') {
      setErr(true)
      return false
    }
  }

  return (
    <div className='userPostFunc flex column'>
      <form onSubmit={handlePost} className='flex column' >
        <div className='flex alit gap' >
          <input onChange={e => setImg(e.target.files[0])} type="file" accept="image/jpeg, image/png, image/gif, image/jfif" id="postImage" style={{ display: "none" }} required />
          <input onChange={e => setTxt(e.target.value)} className='postTextFunc' value={text} placeholder='Post caption...' />
          <label htmlFor="postImage">
            <div className="pointer poppins flex alit postHover">
              <FaPlusSquare className='icon' />
              <p>Upload Image</p>
            </div>
          </label>
          <button onClick={handlePost}>Post</button>
        </div>
      </form>
      {err && setTimeout(() => { setErr(false); }, 4000) && <p className='poppins' style={{ color: 'red' }}>Include an Image to post</p>}
    </div>
  )
}

export default PostFunc;