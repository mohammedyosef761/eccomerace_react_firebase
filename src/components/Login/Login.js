import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [loading ,setLoading] = useState(false);
  const auth = getAuth();



  const login =async ()=>{
    try{
      setLoading(true)
      const result =await signInWithEmailAndPassword(auth,email, password);
      localStorage.setItem('currentUser',JSON.stringify(result));
      console.log(result);
      toast.success('Login successful')
      setLoading(false);
      setEmail('');
      setPassword('');
      window.location.href='/';
    
    }catch(error){
         console.log(error);
         toast.error('Login failed')
         setLoading(false);
         setEmail('');
         setPassword('');
    }
  }




  return (
    <div className='login-parent'>

        {loading && <Loader />}
        <div className='row justify-content-center'>
              <div className='col-md-4 z1'>
                   <div className='login-form '>
                     <h2>Login</h2>
                     <hr />
                     <input  type="text" className='form-control' placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /> 
                     <input  type="text" className='form-control' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />  
                     <button className='my-3  btn btn-primary' onClick={login}>Login</button>

                     <hr/>
                     <Link to='/register'>Click here to Register</Link>
                     </div>
              </div>
               
              <div className='col-md-5 z1'>
              <lottie-player 
              src="https://assets3.lottiefiles.com/packages/lf20_oftwajlo.json"
                background="transparent"  
                speed="1" 
                  loop 
                  autoplay></lottie-player>
              </div>
        </div>

        <div className='login-bottom'>
                 
        </div>
    </div>
  )
}

export default  Login