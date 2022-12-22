import React, { useContext } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import {FaBars, FaCompass, FaHome, FaPowerOff, FaRegPaperPlane, FaSearch} from 'react-icons/fa'
import { AuthContext } from '../../context/context'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import UserProfile from '../../pages/userProfile'
import img from '../../assets/R.jfif'

const Nav = () => {
  const {currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const openUp = () => {
    const sign = document.querySelector('.signOut')
    sign.classList.toggle('show')
  }

  const signout = () => {
    signOut(auth)
    navigate('/')
  }

  return (
    <div className='nav'>
      <nav>
        <h1 className='headNav'>
          Kenstagram
        </h1>
        <ul className='navUl flex column'>
          <NavLink to="/" className='link'>
            <li>
              <FaHome className='icon' /> Home
            </li>
          </NavLink>
          <NavLink to='/search' className='link'>
            <li>
              <FaSearch className='icon' /> Search
            </li>
          </NavLink>
          <li>
            <FaCompass className='icon' /> Explore
          </li>
          <NavLink to='/messages'className='link'>
            <li>
              <FaRegPaperPlane className='icon' /> Messages
            </li>
          </NavLink>

          {/* <div onClick={click}>
            <NavLink to={`/${data.user.uid}`} className='link' >
              <li>
                <img src={data.user.photoURL} className='pImg' alt="" /> Profile
              </li>
            </NavLink>
          </div> */}
          <NavLink to={`/${currentUser.uid}`} className='link' >
              <li>
                <img src={currentUser.photoURL} className='pImg' alt="" /> Profile
              </li>
            </NavLink>
        </ul>

        <ul className='navUl2'>
          <li onClick={openUp}>
            <FaBars className='icon' /> More
          </li>
          <li onClick={signout} className='signOut'>
            <FaPowerOff className='icon' /> Sign Out
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav;