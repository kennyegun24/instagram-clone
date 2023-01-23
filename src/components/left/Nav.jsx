import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaCompass, FaHome, FaPlusCircle, FaPowerOff, FaRegPaperPlane, FaSearch } from 'react-icons/fa'
import { AuthContext } from '../../context/context'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ChatContext } from '../../context/chatsContext'
import { MessagesContext } from '../../context/messages'
import { HideAndShow } from '../../context/HideShow'
import MobilePost from './MobilePost'

const Nav = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const { dischargeMessages } = useContext(MessagesContext)
  const [hidePostIcon, setHidePostIcon] = useState(true)

  const navigate = useNavigate()

  const click = async () => {
    const res = await getDoc(doc(db, "posts", currentUser.uid))
    if (!res.exists()) {
      await setDoc(doc(db, "posts", currentUser.uid), { posts: [] })
    }
  }

  const { hideShow } = useContext(HideAndShow)
  const { hide } = useContext(HideAndShow)

  const [Hide, setHide] = useState(true)
  const remHide = () => {
    if (Hide === true) {
      setHide(false)
      hideShow({ type: 'hide', payload: false })
    }
    else {
      setHide(true)
      hideShow({ type: 'hide', payload: true })
    }
  }

  const hideIcons = () => {
    hidePostIcon && setHidePostIcon(false)
  }

  const handleSelect = () => {
    dispatch({ type: "CHANGE_USER", payload: 'null' })
    dischargeMessages({ type: 'messages', payload: 'null' })
    hidePostIcon && setHidePostIcon(false)
    remHide()
  }

  const handleIconSelect = () => {
    !hidePostIcon && setHidePostIcon(true)
    dispatch({ type: "CHANGE_USER", payload: 'null' })
    dischargeMessages({ type: 'messages', payload: 'null' })
    remHide()
  }

  const openUp = () => {
    const sign = document.querySelector('.hidee')
    sign.classList.toggle('showw')
  }

  const signout = () => {
    signOut(auth)
    navigate('/')
    handleSelect()
  }

  // const [showMobile, setShowMobile] = useState(false)

  const showPost = () => {
    // setShowMobile(true)
    hideShow({ type: 'hidePost', payload: true })
  }

  return (
    <div>
      {hide.hidePost && <MobilePost />}
      <div className={`flex column alit mobileNavDiv `}>
        <h1 className='headNav'>
          Kenstagram
        </h1>
        <nav className='nav'>

          <ul className='navUl flex column'>

            <div className=''>
              <NavLink to="/" className='flex alit gap link' onClick={handleIconSelect}>
                <FaHome className='icon' />
                <li>
                  Home
                </li>
              </NavLink>
            </div>

            <div className=''>
              <NavLink to='/search' className='flex gap alit link' onClick={handleSelect}>
                <FaSearch className='icon' />
                <li>
                  Search
                </li>
              </NavLink>
            </div>

            <div className='flex gap alit' onClick={handleSelect}>
              <FaCompass className='icon' />
              <li>
                Explore
              </li>
            </div>

            <div className={hidePostIcon ? 'PostFile' : 'hide'}>
              {/* <input type="file" id='file' style={{ display: 'none' }} /> */}
              {/* <label htmlFor="file" className='iconLabel'> */}
              <div className='iconPluss'>

                <FaPlusCircle className='iconPlus' aria-hidden={true} onClick={showPost} />
                {/* </label> */}
              </div>
            </div>

            <div className='' onClick={hideIcons}>
              <NavLink to='/messages' className='link gap flex alit'>
                <FaRegPaperPlane className='icon' />
                <li>
                  Messages
                </li>
              </NavLink>
            </div>

            <div className=''>
              <NavLink to={`/${currentUser.uid}`} onClick={handleIconSelect} className='link flex alit gap' >
                <img src={currentUser.photoURL} className='pImg' alt="" />
                <li onClick={click}>
                  Profile
                </li>
              </NavLink>
            </div>
            <ul className='navUl2'>
              <div className='flex alit' onClick={openUp}>
                <FaBars className='icon' />
                <li>
                  More
                </li>
              </div>
              <div className='flex alit hidee' onClick={signout} >
                <FaPowerOff className='icon' />
                <li className='signOut' >
                  Sign Out
                </li>
              </div>
            </ul>
          </ul>
        </nav>
      </div></div>
  )
}

export default Nav;