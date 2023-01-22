import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { FaArrowLeft, FaPlusSquare } from 'react-icons/fa'
import nullImg from '../../assets/nullimage.jpg'
import { AuthContext } from '../../context/context'
// import { StatusContext } from '../../context/status'
import { db, storage } from '../../firebase'
import { v1 as uuid } from 'uuid'
import { HideAndShow } from '../../context/HideShow'
// import { useNavigate } from 'react-router-dom'

const MobilePost = () => {
    const [err, setErr] = useState(false)
    const [status, setStatus] = useState(false)
    // const { dispatchStatus } = useContext(StatusContext)
    const { currentUser } = useContext(AuthContext)
    const [img, setImg] = useState(null)
    const [text, setText] = useState('')
    const date = new Date();
    // const navigation = useNavigate()

    const dateString = date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });

    const postImg = async (e) => {
        e.preventDefault()
        if (text !== '' && img !== null) {
            setStatus(true)
            // dispatchStatus({ type: 'SWITCH_STATUS', payload: true })

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
                    hideShow({ type: 'hidePost', payload: false })
                    // dispatchStatus({ type: 'SWITCH_STATUS', payload: false })
                })
            })
            setImg(null)
            setText('')
        }

        if (img !== null && text === '') {
            setStatus(true)
            // dispatchStatus({ type: 'SWITCH_STATUS', payload: true })
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
                    hideShow({ type: 'hidePost', payload: false })
                    // navigation('/')
                    // dispatchStatus({ type: 'SWITCH_STATUS', payload: false })
                })
            })
            setImg(null)

        } if (!img) {
            setErr(true)
            return false
        }
    }

    const { hideShow } = useContext(HideAndShow)
    const remove = () => {
        hideShow({ type: 'hidePost', payload: false })
    }

    return (
        <div>
            {
                status &&
                <div className='poppins rollingCenter' style={{ color: 'blue', zIndex: '1000' }} >
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

            <div style={{ height: '100%', zIndex: '999', background: '#000', width: '100%', position: 'fixed', padding: '1rem', filter: status && 'blur(2px)' }}>
                <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '20px' }} onClick={remove}>
                        <FaArrowLeft />
                        <p style={{ opacity: '0.7' }}>Back to homepage</p>
                    </div>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={postImg}>
                        <div style={{ display: 'flex', gap: '0.5rem', width: '100%', border: '1px solid #fff', padding: '0.5rem' }}>
                            <div style={{ order: '1', width: '100px', height: 'auto', opacity: !img && '0.5' }}>
                                {<img src={img ? URL.createObjectURL(img) : nullImg} alt='' className='imgObj3' />}
                            </div>
                            <div style={{ order: '2', width: '100%', maxWidth: '100%', overflow: 'auto' }}>
                                {text && <p className='txtObj'>{text.substring(0, 40) + '...'}</p>}
                            </div>
                        </div>
                        <input type="file" name="" id="filePost" onChange={e => setImg(e.target.files[0])} style={{ display: 'none' }} />
                        <label htmlFor="filePost" style={{ display: 'flex', gap: '0.5rem' }}>
                            <FaPlusSquare />
                            <p>Post any Image</p>
                        </label>
                        <textarea onChange={e => setText(e.target.value)} style={{ background: '#111', padding: '0.5rem', color: '#fff', fontSize: '16px' }} id="" cols="30" rows="10" />
                        <input type="submit" value="Post" style={{ width: 'fit-content', margin: 'auto', padding: '0.5rem', border: '1px solid #279bdf', fontSize: '15px', color: '#fff', background: '#000', cursor: 'pointer' }} />
                        {err && setTimeout(() => { setErr(false); }, 4000) && <p className='poppins' style={{ color: 'red', textAlign: 'center' }}>Include an Image to post</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MobilePost