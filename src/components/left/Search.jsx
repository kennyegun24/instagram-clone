import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/R.jfif'
import { AuthContext } from '../../context/context'
import { db } from '../../firebase'

const Search = () => {

  const [useranme, setUseranme] = useState('')
  let [user, setuser] = useState(null)
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", useranme));

    let darray = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // let dat = []
        // dat.push(data)

        // setuser(data)
        // console.log(doc.displayName, '=>', doc.data)
        // doc.map((e) => {
        //   console.log(e)

        //   setuser(e)
        // })
      // darray.push(doc.data())
      // setuser([darray])
        // console.log(user)
        user(data)
        console.log(user)
      })

    } catch(err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.preventDefault()
    handleSearch();
  }

  const handleClick = async () => {
    //check whether the group exists or not, if not, create
    // const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid

    // try{
    //   const response = await getDoc(doc(db, "chats", combineId))
    //   if(!response.exists()) {
    //     await setDoc(doc(db, "chats", combineId), {messages: []})

    //     await updateDoc(doc(db, "userchat", currentUser.uid), {
    //       [combineId+".userInfo"]: {
    //         uid:user.uid,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL
    //       },
    //       [combineId+".date"]:serverTimestamp()
    //     });
    //     await updateDoc(doc(db, "userchat", user.uid), {
    //       [combineId+".userInfo"]: {
    //         uid:currentUser.uid,
    //         displayName: currentUser.displayName,
    //         photoURL: currentUser.photoURL
    //       },
    //       [combineId+".date"]:serverTimestamp()
    //     });
    //   }
    // }catch(error) {

    // }
    // const navigate = useNavigate()
    // navigate(`/${user.displayName}`)
    setuser(null)
    setUseranme('')
  }

  return (
    <div className='searchDiv'>
      <form className='searchForm' onSubmit={handleKey}>
        <input type="search" className='search' value={useranme} onChange={(e) =>setUseranme(e.target.value)} placeholder='search for a user...'/>
      </form>
      {err && <span>No users....</span>}
      { user && (
        user.map((map) => {
          console.log(map)
          return (
          <p key={map[0].uid}>{map[0].displayName}</p> )
})
       /*{/* {user &&( 
      <Link to={`/${user.displayName}`}>
        <div className="flex gap searchUser alit" onClick={handleClick}>
          <img src={img} className='pImg2' alt="" />
          <div className='userChat userSearch'>
            <p>{user.displayName}</p>
            <span>hey there</span>
          </div>
        </div>
      </Link> */
      )}
  </div>
  )
}

export default Search;