import React from 'react'
import SecUser from '../../pages/SecUser';
import SecUserProPosts from '../secuserosts.jsx/SecUserProPosts';

const SecUserProfile = () => {
  return (
    <div className='home flex column'>
      <div className='msgCnt'>
        <SecUser />
      </div>
      <div>
        <SecUserProPosts />
      </div>
    </div>
  )
}

export default SecUserProfile;