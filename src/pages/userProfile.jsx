import React from 'react'
import Userprof from '../components/center/Userprof'
import PostFunc from '../components/profilePosts/PostFunc'
import ProPosts from '../components/profilePosts/ProPosts'

const UserProfile = () => {
  return (
    <div className='home flex column'>
      <div className='msgCnt'>
        <Userprof />
      </div>
      <div className='userPosts'>
        <ProPosts />
      </div>
      <div className='userPostFunc'>
        <div>
          <PostFunc />
        </div>
      </div>
    </div>
  )
}

export default UserProfile