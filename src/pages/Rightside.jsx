import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/context'
import { UserContext } from '../context/searchUser'
import { db } from '../firebase'
const Rightside = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(UserContext)
  const { dispatch } = useContext(UserContext)

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

  return (
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
  )
}

export default Rightside;