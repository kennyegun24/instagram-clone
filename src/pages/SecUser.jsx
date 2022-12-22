import { uuidv4 } from '@firebase/util'
import { arrayUnion, collection, deleteField, doc, FieldValue, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
// import firebase from 'firebase/app'
import { ref } from 'firebase/storage'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/context'
// import img from '../../assets/R.jfif'
import { UserContext } from '../context/searchUser'
import { db } from '../firebase'
import { arrayRemove } from 'firebase/firestore'

const SecUser = () => {

  const {data} = useContext(UserContext)
  const {currentUser} = useContext(AuthContext)
  const navigation = useNavigate()
  const arrBg = async () => {
    let arrBgs = []
  }
   const handleFollow = async () => {
      try {
        const res = await getDoc(doc(db, "follow", data.user.uid))
        //   if(!res.exists()) {
        //     await setDoc(doc(db, "follow", data.user.uid), {follow: (
        //       arrayUnion({
        //         uid: currentUser.uid
        //       }))
        //     })
        //   } else {
        //     console.log('hey')
        //   }
        const heyyyyy = res.data()
        const fol = heyyyyy.follow
        let arr = []
        arr.push(fol)
        const arr3 = arr.flat()
        let arr4 = []
        arr3.forEach(({id}) => {
          arrBg.arrBgs.push(id)
          arr4.push(id)
        })
        if (!arr4.includes(currentUser.uid)) {
          await updateDoc(doc(db, "follow", data.user.uid), {follow: (
            arrayUnion({
              id: currentUser.uid
            }))
          })
        }

        if(arr4.includes(currentUser.uid)) {
          try {
            await updateDoc(doc(db, "follow", data.user.uid), {
              follow: arrayRemove({id: currentUser.uid})
            })
          } catch(error){
            console.log(error);
          }
        }

      } catch {
        
      }
   }

const handleClick = async () => {
    const combineId = currentUser.uid > data.user.uid ? currentUser.uid + data.user.uid : data.user.uid + currentUser.uid

//     try {
//       const response = await getDoc(doc(db, "chats", combineId))
//       if(!response.exists()) {
//         await setDoc(doc(db, "chats", combineId), {messages: []})

//         await updateDoc(doc(db, "userchat", currentUser.uid), {
//             [combineId+".userInfo"]: {
//                 uid:data.user.uid,
//                 displayName:data.user.displayName,
//                 photoURL:data.user.photoURL
//               },
//               [combineId+".date"]:serverTimestamp()
//         });
//         await updateDoc(doc(db, "userchat", data.user.uid), {
//             [combineId+".userInfo"]: {
//               uid:currentUser.uid,
//               displayName: currentUser.displayName,
//               photoURL: currentUser.photoURL
//             },
//             [combineId+".date"]:serverTimestamp()
//           });
//           navigation('/messages')
//       }
//     //   navigation('/messages')
//       console.log(response.data().messages.length)

//     } catch {

//     }
// console.log('hey')
// const heyy = await getDoc(doc(db, "userchat", currentUser.uid))
// const heyyy = Object.entries(heyy.data())
// console.log(heyyy)
// console.log(currentUser.uid)
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

  } catch(err) {
      //  setErr(true)
      console.log(err)
    }
  }
user()
// console.log('hey')

/* check follows where uid === data.user.uid
// if it exists, {
    
}
*/
}
console.log(arrBg.arrBgs)

  return (
    <div className='userProfCont'>
      <div className="userprofdiv">
        <div className="profHeader flex gapBg alit">
          <img src={data.user.photoURL} alt="" className="pImg3"/>

          <div className="profNameFlls flex column gap2">
            <div className="msgFollow flex gapBg alit">
                <p>{data.user.displayName}</p>
                <span onClick={handleClick}>Message</span>
                <span onClick={handleFollow}>Follow</span>
            </div>
            <div className='flex gap2'>
              <span>1 post</span>
              <span>{arrBg.length}</span>
              <span>217 following</span>
            </div>
            <p>{data.user.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecUser;