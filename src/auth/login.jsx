import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {

  const [err, setErr] = useState(false)
  const navigation = useNavigate()

  const submitInput = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {

      await signInWithEmailAndPassword(auth, email, password)
      navigation("/")
      
    } catch(err) {
      setErr(true)
    }

  }

  return (
    <div className='RegDiv flex'>
      <div className="flex column gap">
        <div className='RegDivSm flex column'>
          <h1 className='head'>Instagram</h1>
          <form className='regForm flex column' onSubmit={submitInput}>
            <input type="email" placeholder='Enter email address'/>
            <input type="password" placeholder='Password'/>
            <button className='signUp' type='submit'>Log in</button>
          </form>
        </div>

        <div className='loginDiv'>
          <p className='loginP'>
            Don't have an account? <Link to='/register' className='link'>Sign up...</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;