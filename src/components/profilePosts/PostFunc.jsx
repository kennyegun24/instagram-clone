import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import { AuthContext } from '../../context/context'
import { v1 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../firebase'
import { StatusContext } from '../../context/status'
export const likeId = uuid()

const PostFunc = () => {

  const [img, setImg] = useState(null)
  const [text, setTxt] = useState("")
  const [err, setErr] = useState(false)
  const [status, setStatus] = useState(false)
  // const { progress } = useContext(StatusContext)
  const { dispatchStatus } = useContext(StatusContext)
  const { currentUser } = useContext(AuthContext)

  const date = new Date();

  const dateString = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  });

  const handlePost = async (e) => {
    e.preventDefault()
    if (text !== '' && img !== null) {
      setStatus(true)
      dispatchStatus({ type: 'SWITCH_STATUS', payload: true })

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
              time: dateString,
            })
          });
          setStatus(false)
          dispatchStatus({ type: 'SWITCH_STATUS', payload: false })
        })
      })
      setImg(null)
      setTxt('')
    }

    if (img !== null && text === '') {
      setStatus(true)
      dispatchStatus({ type: 'SWITCH_STATUS', payload: true })
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "posts", currentUser.uid), {
            posts: arrayUnion({
              name: currentUser.displayName,
              id: uuid(),
              date: Timestamp.now(),
              time: dateString,
              img: downloadURL,
              photoURL: currentUser.photoURL,
            })
          })
          setStatus(false)
          dispatchStatus({ type: 'SWITCH_STATUS', payload: false })

        })
      })
      setImg(null)

    } if (!img) {
      setErr(true)
      return false
    }
  }

  return (
    <div className='userPostFunc flex column'>
      <form onSubmit={handlePost} className='flex column' >
        {
          status &&
          <div className='poppins rollingCenter' style={{ color: 'blue' }} >
            <div className="postAnimationCenter">
              <div className="postingAnimation">
                <p className="postingText poppins">Uploading Post...</p>
              </div>
              <div className="dmdiv">
                <p className="line2"></p>
                <p className="line3"></p>
                <p className="line4"></p>
                <p className="line5"></p>
                <p className="line6"></p>
                <p className="secline2"></p>
                <p className="secline3"></p>
                <p className="secline4"></p>
                <p className="secline5"></p>
                <p className="secline6"></p>
              </div>
            </div>
          </div>
        }
        {err && setTimeout(() => { setErr(false); }, 4000) && <p className='poppins' style={{ color: 'red' }}>Include an Image to post</p>}

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
          {img && <img src={URL.createObjectURL(img)} alt='' className='imgObj' />}
        </div>
      </form>
    </div>
  )
}

export default PostFunc;