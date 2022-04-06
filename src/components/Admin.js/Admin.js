import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../../fireConfig';
import Layout from '../Layout';
import './admin.css'
import { useDispatch } from 'react-redux';

import { deleteDoc, doc } from "firebase/firestore";
import { AddAdmin } from '../rudux/reducers';

const Admin = () => {
    const [admin,setAdmin] = useState('')
    const [admins,setAdmins] = useState([]);
    const dispatch= useDispatch();

    const addAdmin = ()=>{
        const articleRef = collection(db, "Admins");
        addDoc(articleRef, {
          admin: admin,
        })
          .then(() => {
            toast("Article added successfully", { type: "success" });

          })
          .catch((err) => {
            toast("Error adding article", { type: "error" });
          });
          setAdmins('');
    }

    useEffect(() => {
        const adminRef = collection(db, "Admins");
        const q = query(adminRef, orderBy("admin", "desc"));
        onSnapshot(q, (snapshot) => {
          const Admins = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAdmins(Admins);
          console.log(Admins);
          dispatch(AddAdmin(Admins))
        });
      },[]);
      console.log(admins)

      const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this admin?")) {
          try {
            await deleteDoc(doc(db, "Admins", id));
            toast("Article deleted successfully", { type: "success" });
          } catch (error) {
            toast("Error deleting article", { type: "error" });
            console.log(error);
          }
        }
      };

  return (
    <Layout>
    <div className='d-flex flex-column align-items-center justify-content-center '>
     <div className='form-group admin'>
     <label className='mt-2'>Enter a new admin </label>
     <input type="email"  placeholder='add a new admin ' value={admin}
     className="form-control w-200" 
     onChange={(e)=>setAdmin(e.target.value)}
            />
     <p>enter the email</p>
        <button  onClick={addAdmin} className='btn btn-primary'> Add</button>
</div>
<br />
<div>
{
    admins.length>0 && admins.map((item)=>(
        <div className='content' key={item.id}>
            <p>{item.admin}</p>
            <button className='btn btn-danger'
            onClick={()=>handleDelete(item.id)}
            >Delete</button>
        </div>
    )
        
    )
}
</div>


    </div>

</Layout>
  )
}

export default Admin