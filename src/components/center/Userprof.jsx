import React, { useContext } from 'react'
import img from '../../assets/R.jfif'
import { AuthContext } from '../../context/context'

const Userprof = () => {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='userProfCont'>
      <div className="userprofdiv">
        <div className="profHeader flex gapBg alit">
          <img src={currentUser.photoURL} alt="" className="pImg3"/>

          <div className="profNameFlls flex column gap2">
            <p>{currentUser.displayName}</p>
            <div className='flex gap2'>
              <span>1 post</span>
              <span>48 followers</span>
              <span>217 following</span>
            </div>
            <p>Kenny Egun</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userprof