import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/context'
import { DischargeContext } from '../../context/discharge'
import { PostCountContext } from '../../context/postsCounts'
import { UserContext } from '../../context/searchUser'
import { StatusContext } from '../../context/status'
import { followingContext } from '../../context/updateFollow'
import { db } from '../../firebase'

const Userprof = () => {

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(UserContext)
  const { dispatch } = useContext(UserContext)
  const { datas } = useContext(DischargeContext)
  const { discharge } = useContext(DischargeContext)
  const { following } = useContext(followingContext)
  const { display } = useContext(followingContext)
  const { count } = useContext(PostCountContext)
  const { progress } = useContext(StatusContext)


  useEffect(() => {
    const updateFollow = async () => {
      const res = await getDoc(doc(db, "follow", currentUser.uid))

      const heyyyyy = res.data()
      const fol = heyyyyy.follow
      let arr = []
      arr.push(fol)
      const arr3 = arr.flat()
      let arr4 = []
      arr3.forEach(({ id }) => {
        arr4.push(id)
      })
      discharge({ type: "discharge", payload: arr4 })
    }
    return () => {
      updateFollow()
    }
  }, [discharge, currentUser.uid])

  useEffect(() => {
    const updateFollowing = async () => {
      const res = await getDoc(doc(db, "following", currentUser.uid))

      const heyyyyy = res.data()
      const fol = heyyyyy.follow
      let arr = []
      arr.push(fol)
      const arr3 = arr.flat()
      let arr4 = []
      arr3.forEach(({ id }) => {
        arr4.push(id)
      })
      display({ type: "follows", payload: arr4 })
    }
    return () => {
      updateFollowing()
    }
  }, [display, currentUser.uid])

  useEffect(() => {
    let darray;
    const user = async () => {
      const citiesRef = collection(db, "users");
      const q = query(citiesRef, where("uid", "==", currentUser.uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        darray = doc.data()
      })
      dispatch({ type: "Switch_User", payload: darray })

    }
    return () => {
      user()
    }
  }, [dispatch, currentUser.uid])

  return (
    <div className='userProfCont' style={{ filter: progress.status && 'blur(5px)' }}>
      <div className="userprofdiv">
        <div className="profHeader flex gapBg alit">
          <img src={data.user.photoURL} alt="" className="pImg3" />

          <div className="profNameFlls flex column gap2">
            <p>{data.user.displayName}</p>
            <div className='flex gap2'>
              <span>{count.post} post</span>
              <span>{datas.user.length} followers</span>
              <span>{following.myFollow.length} following</span>
            </div>
            <p>{data.user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Userprof;