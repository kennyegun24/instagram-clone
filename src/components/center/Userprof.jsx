import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import img from '../../assets/R.jfif'
import { AuthContext } from '../../context/context'
import { UserContext } from '../../context/searchUser'
import { db } from '../../firebase'

const Userprof = () => {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(UserContext)
  const {dispatch} = useContext(UserContext)
  let darray = null;

  const user = async () => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("uid", "==", currentUser.uid));

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      darray = doc.data()
    })
    dispatch({type:"Switch_User", payload: darray})

  } catch(err) {
      //  setErr(true)
    }
  }

  useEffect(() => {
    user()
  }, [])


  return (
    <div className='userProfCont'>
      <div className="userprofdiv">
        <div className="profHeader flex gapBg alit">
          <img src={data.user.photoURL} alt="" className="pImg3"/>

          <div className="profNameFlls flex column gap2">
            <p>{data.user.displayName}</p>
            <div className='flex gap2'>
              <span>1 post</span>
              <span>48 followers</span>
              <span>217 following</span>
            </div>
            <p>{data.user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userprof