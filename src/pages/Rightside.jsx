// import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useContext } from 'react'
import img from '../assets/R.jfif'
import { AuthContext } from '../context/context'
// import { db } from '../firebase'
const Rightside = () => {
  const {currentUser} = useContext(AuthContext)
  // const citiesRef = collection(db, "userchat");
  // const unSub = onSnapshot(doc(db, "userchat", currentUser.uid))

  // console.log(unSub)
// console.log({currentUser})
  return (
    <div className='profile'>
      <img src={currentUser.photoURL} className="pImg2" alt="" />
      <div className='profileName'>
        <p>
          {currentUser.displayName}
        </p>
        <p className='profileName2'>
          Kenny Elias
        </p>
      </div>
    </div>
  )
}

export default Rightside;