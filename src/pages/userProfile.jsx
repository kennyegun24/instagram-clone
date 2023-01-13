import React from 'react'
import Userprof from '../components/center/Userprof'
import PostFunc from '../components/profilePosts/PostFunc'
import ProPosts from '../components/profilePosts/ProPosts'

const UserProfile = () => {

  return (
    <div className='home home2 flex column'>
      <div className='profCnt'>
        <Userprof />
      </div>
      <div className='userPosts'>
        <ProPosts />
      </div>
      <div>
        <div className='userPostFunc'>
          <PostFunc className='func' />
        </div>
      </div>
    </div>
  )
}

export default UserProfile