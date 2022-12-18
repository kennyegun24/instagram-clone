import React from 'react'
import Center from '../pages/Center';
import Leftside from '../pages/Leftside';
import Rightside from '../pages/Rightside';

const Homepage = () => {
  return (
    <div className='home'>
      {/* <div className="left">
        <Leftside className="left"/>
      </div> */}
      <div className='center'>
        <Center />
        <Center />
      </div>
      <div className='right'>
        <Rightside />
      </div>
    </div>
  )
}

export default Homepage;