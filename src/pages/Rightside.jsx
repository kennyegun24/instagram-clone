import { arrayUnion, collection, doc, getDocs, query, Timestamp, updateDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'
import { v1 as uuid } from 'uuid'
import { AuthContext } from '../context/context'
import { UserContext } from '../context/searchUser'
import { StatusContext } from '../context/status'
import { db, storage } from '../firebase'
import nullImg from '../assets/nullimage.jpg'
const Rightside = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(UserContext)
  const { dispatch } = useContext(UserContext)
  const { progress } = useContext(StatusContext)

  useEffect(() => {
    const user = async () => {
      let darray;
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("uid", "==", currentUser.uid));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          darray = doc.data()
        })
        dispatch({ type: "Switch_User", payload: darray })

      } catch (err) {
      }
    }
    return () => {
      user()
    }
  }, [dispatch, currentUser.uid])

  const [img, setImg] = useState(null)
  const [text, setTxt] = useState("")
  const [err, setErr] = useState(false)
  const [status, setStatus] = useState(false)
  // const { progress } = useContext(StatusContext)
  const { dispatchStatus } = useContext(StatusContext)

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
    <div>
      <div className='profile flex alit'>
        <img src={currentUser.photoURL} className="pImg2" alt="" />
        <div className='profileName'>
          <p>
            {currentUser.displayName}
          </p>
          <p className='profileName2'>
            {data.user.name}
          </p>
        </div>
      </div>

      <div className='userPostFunc flex column' style={{ height: '100%' }}>
        <form onSubmit={handlePost} className='flex column' style={{ width: '90%' }}>
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

          <div className='flex alit column gap jstCnt' style={{ filter: progress.status && 'blur(5px)', height: '55vh', width: '100%' }}>
            <div className="objTextImg flex gap" style={{ width: '100%', marginTop: '5vh', border: '1px solid #fff', borderRadius: '5px', padding: '2%', height: '12vh', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ order: '1', width: '60px', height: '60px', opacity: !img && '0.5' }}>{<img src={img ? URL.createObjectURL(img) : nullImg} alt='' className='imgObj2' />}</div>
                <div style={{ order: '2', width: '100%' }}>{text && <p className='txtObj'>{text.substring(0, 40) + '...'}</p>}</div>
              </div>
            </div>
            <input onChange={e => setImg(e.target.files[0])} type="file" accept="image/jpeg, image/png, image/gif, image/jfif" id="postImage" style={{ display: "none" }} required />
            <textarea onChange={e => setTxt(e.target.value)} className='postTextFunc2' style={{ marginTop: '3vh' }} rows="10" value={text} placeholder='Post caption...' />
            <label htmlFor="postImage">
              <div className="pointer poppins flex alit postHover">
                <FaPlusSquare className='icon' />
                <p>Upload Image</p>
              </div>
            </label>
            <button onClick={handlePost}>Post</button>
          </div>
          {err && setTimeout(() => { setErr(false); }, 4000) && <p className='poppins' style={{ color: 'red', textAlign: 'center' }}>Include an Image to post</p>}
        </form>
      </div >
    </div >
  )
}

export default Rightside;