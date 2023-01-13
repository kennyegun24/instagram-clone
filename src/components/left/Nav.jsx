import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaCompass, FaHome, FaPowerOff, FaRegPaperPlane, FaSearch } from 'react-icons/fa'
import { AuthContext } from '../../context/context'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ChatContext } from '../../context/chatsContext'
import { MessagesContext } from '../../context/messages'

const Nav = () => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)
  const { dischargeMessages } = useContext(MessagesContext)

  const navigate = useNavigate()

  const click = async () => {
    const res = await getDoc(doc(db, "posts", currentUser.uid))
    if (!res.exists()) {
      await setDoc(doc(db, "posts", currentUser.uid), { posts: [] })
    }
  }

  const handleSelect = () => {
    dispatch({ type: "CHANGE_USER", payload: 'null' })
    dischargeMessages({ type: 'messages', payload: 'null' })
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

  return (
    <div className='flex column alit mobileNavDiv'>
      <h1 className='headNav'>
        Kenstagram
      </h1>
      <div className='nav'>
        <nav>
          <div className='mobileFlex'>

            <ul className='navUl flex column'>

              <NavLink to="/" className='link' onClick={handleSelect}>
                <div className='flex alit'>
                  <FaHome className='icon' />
                  <li>
                    Home
                  </li>
                </div>
              </NavLink>

              <NavLink to='/search' className='link' onClick={handleSelect}>
                <div className='flex alit'>
                  <FaSearch className='icon' />
                  <li>
                    Search
                  </li>
                </div>
              </NavLink>

              <div className='flex alit' onClick={handleSelect}>
                <FaCompass className='icon' />
                <li>
                  Explore
                </li>
              </div>

              <NavLink to='/messages' className='link'>
                <div className='flex alit'>
                  <FaRegPaperPlane className='icon' />
                  <li>
                    Messages
                  </li>
                </div>
              </NavLink>

              <NavLink to={`/${currentUser.uid}`} onClick={handleSelect} className='link' >
                <div className='flex alit'>
                  <img src={currentUser.photoURL} className='pImg' alt="" />
                  <li onClick={click}>
                    Profile
                  </li>
                </div>
              </NavLink>
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
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Nav;