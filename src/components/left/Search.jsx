import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/R.jfif'
import { AuthContext } from '../../context/context'
import { UserContext } from '../../context/searchUser'
import { db } from '../../firebase'

const Search = () => {

  const [useranme, setUseranme] = useState('')
  let [user, setuser] = useState('')
  const [err, setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(UserContext)

  const handleSearch = async () => {
    const citiesRef = collection(db, "users");
    const q = query(citiesRef, where("displayName", "==", useranme));

    let darray = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      darray.push(doc.data())
      setuser([darray])
      })

    } catch(err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.preventDefault()
    handleSearch();
  }

  const handleClick = (u) => {
    dispatch({type:"Switch_User", payload: u})
    setuser(null)
    setUseranme('')
  }
  console.log(user)

  return (
    <div className='searchDiv'>

      <form className='searchForm flex column alit' onChange={handleKey}>
        <input type="search" className='search' value={useranme} onChange={(e) =>setUseranme(e.target.value)} placeholder='search for a user...'/>
      </form>

      { user.length !== 0 ? (
        user.flat().map((map) => {

        return (
        <Link to={`/${map.uid}`} key={map.uid} className="link" >
          
          <div className="flex gap searchUser alit" onClick={()=>handleClick(map)} key={map.uid}>
            <img src={map.photoURL} className='pImg2' alt="" />
            <div className='userChat userSearch poppins fnt12'>
              <p>{map.displayName}</p>
              <p>{map.name}</p>
            </div>
          </div>

        </Link>
        )
      })) : <p className='searchUser poppins'>No users...</p>}
    </div>
  )
}

export default Search;