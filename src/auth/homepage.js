import React, { useContext } from 'react'
import { StatusContext } from '../context/status';
import Center from '../pages/Center';
import Rightside from '../pages/Rightside';

const Homepage = () => {
  const { progress } = useContext(StatusContext)

  return (
    <div className='flex home'>
      <div className='center' style={{ filter: progress.status && 'blur(5px)' }} >
        <Center />
      </div>
      <div className='right'>
        <Rightside />
      </div>
    </div>
  )
}

export default Homepage;