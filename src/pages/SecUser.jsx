import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
import { UserContext } from '../context/searchUser'
import { db } from '../firebase'
import { arrayRemove } from 'firebase/firestore'
import { DischargeContext } from '../context/discharge'
import { followingContext } from '../context/updateFollow'
import { PostCountContext } from '../context/postsCounts'

const SecUser = () => {

  const { data } = useContext(UserContext)
  const { currentUser } = useContext(AuthContext)
  const { datas } = useContext(DischargeContext)
  const { discharge } = useContext(DischargeContext)
  const { following } = useContext(followingContext)
  const { display } = useContext(followingContext)
  const { count } = useContext(PostCountContext)

  const navigation = useNavigate()

  useEffect(() => {
    const updateFollow = async () => {
      const res = await getDoc(doc(db, "follow", data.user.uid))

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
  }, [data.user.uid, discharge])

  useEffect(() => {
    const updateFollowing = async () => {
      const res = await getDoc(doc(db, "following", data.user.uid))

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
  }, [display, data.user.uid])

  const handleFollow = async () => {
    try {
      const res = await getDoc(doc(db, "follow", data.user.uid))
      if (!res.exists()) {
        await setDoc(doc(db, "follow", data.user.uid), {
          follow: (
            arrayUnion({
              uid: currentUser.uid
            }))
        })
      }
      const resFoll = await getDoc(doc(db, "following", currentUser.uid))
      if (!resFoll.exists()) {
        await setDoc(doc(db, "following", currentUser.uid), {
          follow: (
            arrayUnion({
              id: data.user.uid
            }))
        })
      }

      const heyyyyy = res.data()
      const fol = heyyyyy.follow
      let arr = []
      arr.push(fol)
      const arr3 = arr.flat()
      let arr4 = []
      arr3.forEach(({ id }) => {
        arr4.push(id)
      })
      if (!arr4.includes(currentUser.uid)) {
        await updateDoc(doc(db, "follow", data.user.uid), {
          follow: (
            arrayUnion({
              id: currentUser.uid
            }))
        })
        const resp = await getDoc(doc(db, "follow", data.user.uid))

        const heyy = resp.data()
        const fols = heyy.follow
        let arr = []
        let arrBg = []
        arr.push(fols)
        const arr3 = arr.flat()
        let arr4 = []
        arr3.forEach(({ id }) => {
          arrBg.push(id)
          arr4.push(id)
        })
        discharge({ type: "discharge", payload: arrBg })

        await updateDoc(doc(db, "following", currentUser.uid), {
          follow: (
            arrayUnion({
              id: data.user.uid
            }))
        })
      }


      if (arr4.includes(currentUser.uid)) {
        await updateDoc(doc(db, "follow", data.user.uid), {
          follow: arrayRemove({ id: currentUser.uid })
        })

        await updateDoc(doc(db, "following", currentUser.uid), {
          follow: arrayRemove({ id: data.user.uid })
        })

        const resp = await getDoc(doc(db, "follow", data.user.uid))

        const heyy = resp.data()
        const fols = heyy.follow
        let arr = []
        let arrBg = []
        arr.push(fols)
        const arr3 = arr.flat()
        let arr4 = []
        arr3.forEach(({ id }) => {
          arrBg.push(id)
          arr4.push(id)
        })

        discharge({ type: "discharge", payload: arrBg })
      }

    } catch {

    }
  }

  const handleClick = async () => {
    const combineId = currentUser.uid > data.user.uid ? currentUser.uid + data.user.uid : data.user.uid + currentUser.uid

    try {
      const response = await getDoc(doc(db, "chats", combineId))
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combineId), { messages: [] })

        await updateDoc(doc(db, "userchat", currentUser.uid), {
          [combineId + ".userInfo"]: {
            uid: data.user.uid,
            displayName: data.user.displayName,
            photoURL: data.user.photoURL
          },
          [combineId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userchat", data.user.uid), {
          [combineId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combineId + ".date"]: serverTimestamp()
        });
        navigation('/messages')
      }
      navigation('/messages')
      console.log(response.data().messages.length)

    } catch {

    }

    let darray = null;

    const user = async () => {
      const citiesRef = collection(db, "follow");
      const q = query(citiesRef, where("uid.follow", "==", data.user.uid));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          darray = doc.data()
          console.log(darray)
        })
        // dispatch({type:"Switch_User", payload: darray})

      } catch (err) {
        //  setErr(true)
        console.log(err)
      }
    }
    user()

  }

  const followCheck = datas.user.includes(currentUser.uid)

  return (
    <div className='userProfCont'>
      <div className="userprofdiv">
        <div className="profHeader flex gapBg alit">
          <img src={data.user.photoURL} alt="" className="pImg3" />

          <div className="profNameFlls flex column gap2">
            <div className="msgFollow flex gapBg alit">
              <p>{data.user.displayName}</p>
              <span onClick={handleClick} className="pointer">Message</span>
              {followCheck ? (<span onClick={handleFollow} className="pointer">Unfollow</span>) : <span className='pointer' onClick={handleFollow}>Follow</span>}
            </div>
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

export default SecUser;