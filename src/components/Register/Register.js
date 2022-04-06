import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth   ,  createUserWithEmailAndPassword } from "firebase/auth";

import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { app } from '../../fireConfig';

const Register = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCPassword] = useState('');
  const [loading ,setLoading] = useState(false);

  const auth = getAuth();

  const register = async ()=>{
    try{
      // console.log(email,password);
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth,email, password);
      console.log(result);
      toast.success('Registration successful')
      setLoading(false);
      setEmail('');
      setPassword('');
      setCPassword('');
      window.location.href='/login';
    }
    catch(error){
         toast.error('Registration failed')
         setLoading(false);
         setEmail('');
         setPassword('');
         setCPassword('');
    }
  }
  return (
    <div className='register-parent'>
    {loading && (<Loader />)}
         <div className='register-top'>
                 
         </div>
        <div className='row justify-content-center'>
              <div className='col-md-5 '>
              <lottie-player 
              src="https://assets3.lottiefiles.com/packages/lf20_oftwajlo.json"
                background="transparent"  
                speed="1" 
                  loop 
                  autoplay></lottie-player>
              </div>
              <div className='col-md-4 z1'>
                   <div className='register-form '>
                     <h2>Register</h2>
                     <hr />
                     <input  type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /> 
                     <input  type="text" className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} /> 
                     <input  type="text" className='form-control' placeholder='confirm password' value={cpassword} onChange={(e)=>{setCPassword(e.target.value)}} /> 
                     <button className='my-3 btn btn-primary' 
                     onClick={register}
                     >Register</button>

                     <hr/>
                     <Link to='/login'>Click here to Login</Link>
                     </div>
              </div>
        </div>
    </div>
  )
}

export default Register