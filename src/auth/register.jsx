import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { FaFacebookSquare } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, storage } from '../firebase'

export const Register = () => {
  const [err, setErr] = useState(false)
  // INITIALIZE USENAVIGATE HOOK
  const navigation = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    const name = e.target[0].value;
    const email = e.target[1].value;
    const displayName = e.target[2].value;
    const password = e.target[3].value;
    const file = e.target[4].files[0]

    try {
      // IMPORT AND AWAIT THE FUNCTION TO CREATE AN ACCOUNT BY PASSING THE EMAIL AND PASSWORD AS PARAMETERS
      const response = await createUserWithEmailAndPassword(auth, email, password)
      // THIS IS TO INITIATE FIREBASE STORAGE
      const storageRef = ref(storage, response.user.uid);
      // THIS IS TO STORE FILES IN THE FIREBASE STORAGE

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });
            // THIS IS TO STORE NEW REGS COLLECTIONS TO DATABASE
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              name,
              photoURL: downloadURL,
            });
            // THIS IS TO STORE AND INITIATE NEW REGS CHATS COLLECTIONS IN DATABASE
            await setDoc(doc(db, "userchat", response.user.uid), {});
            await setDoc(doc(db, "following", response.user.uid), { follow: [] })
            await setDoc(doc(db, "posts", response.user.uid), { posts: [] })
            await setDoc(doc(db, "follow", response.user.uid), { follow: [] })
            navigation('/');
          } catch (err) {
            setErr(true)
          }
        })
      })
    } catch (err) {
      setErr(true)
    };
  }


  return (
    <div className='RegDiv flex'>
      <div className="flex column gap">
        <div className='RegDivSm flex column'>
          <h1 className='head'>Kenstagram</h1>
          <h3 className='signUpIntro'>Sign up to see photo and videos from your friends</h3>
          <button className='lgBtn'>
            <FaFacebookSquare /> Login With FaceBook
          </button>
          <span className='or'>
            OR
          </span>
          <form className='regForm flex column' onSubmit={register}>
            <input type="name" placeholder='Full Name' />
            <input type="email" placeholder='Enter your Email' />
            <input type="name" placeholder='Enter Username' />
            <input type="password" placeholder='Password' />
            <input type="file" />
            <div className="terms flex column">
              <p className='info'>People who use our service may have uploaded your contact information to instagram. Learn More</p>
              <p className='info'>By signing up, you agree to our Terms, Privcy and Cookies policy.</p>
            </div>
            <button className='signUp' type='submit'>Sign Up</button>
            {err && <span>Error occured</span>}
          </form>
        </div>

        <div className='loginDiv'>
          <p className='loginP'>
            Have an account? <Link className='link' to='/login'>Log in...</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
