import React from 'react'
import Layout from '../Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../fireConfig'
import CreateProducts from './CreateProducts'
import Products from './Products'

const AddProduct = () => {
  const [user]=useAuthState(auth);
  return (
    <Layout>
    {user && user.email==='mohammedyosef712@gmail.com'? 
    <div className='container'>
    <div className='row'>
    <div className='col-sm-12 col-md-8 col-lg-4'>
    <CreateProducts />
    </div>
        
       
       <div className='col-sm-12 col-sm-6 col-lg-8'>
        <Products />
        </div>
        </div>
        </div>
    :"home"}
    </Layout>
  )
}

export default AddProduct