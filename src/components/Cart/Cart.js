import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../fireConfig';
import { AddToCarts } from '../rudux/reducers';
import  {useDispatch}  from 'react-redux';
import Layout from '../Layout';
import {BsFillTrashFill} from 'react-icons/bs';
import { toast } from 'react-toastify';
import {IoMdArrowDropleftCircle} from 'react-icons/io';
import {IoMdArrowDroprightCircle}from 'react-icons/io';

const Cart = () => {
    const [carts,setCarts]= useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const cartRef = collection(db, "Carts");
        console.log(cartRef);
        const q = query(cartRef, orderBy("title", "desc"));
        onSnapshot(q, (snapshot) => {
          const Carts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCarts(Carts);
          console.log(Carts);
          dispatch(AddToCarts(Carts))
        });
     
    },[])

    const handleDecrease = async(id , qty )=>{
      if(qty===1){
        deleteFromCart(id);
        return ;
      }
       const userDoc = doc(db,'Carts',id);
       const newFields = {qty:qty-1};
       await updateDoc(userDoc,newFields);
    }
    const handleIncrease = async(id , qty )=>{
      const userDoc = doc(db,'Carts',id);
      const newFields = {qty:qty+1};
      await updateDoc(userDoc,newFields);
   }

    const deleteFromCart = async (id) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
          try {
            await deleteDoc(doc(db, "Carts", id));
            toast("Article deleted successfully", { type: "success" });
          } catch (error) {
            toast("Error deleting article", { type: "error" });
            console.log(error);
          }
        }
      };

  return (
    <Layout>  
       <table className='table mt-2'>
         <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
         </thead>
         <tbody>
           {carts.map(item=>(
             <tr>
               <td><img src={item.imageUrl}   height="80" width="80" /> </td>
               <td>{item.title}</td>
               <td>{item.price}</td>
               <td>
               <div>
               <span onClick={()=>{handleDecrease(item.id,item.qty)}}> <IoMdArrowDropleftCircle/> </span>
               <span>{item.qty}</span>
                <span onClick={()=>{handleIncrease(item.id , item.qty)}}> <IoMdArrowDroprightCircle /> </span>
               </div>
               </td>
               <td><BsFillTrashFill  onClick={()=>{deleteFromCart(item.id)}}/></td>
             </tr>
           ))}
         </tbody>
       </table>
    </Layout>

  )
}

export default Cart