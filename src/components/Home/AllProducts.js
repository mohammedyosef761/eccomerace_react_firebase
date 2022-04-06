import React,{useEffect, useState} from 'react'
import Layout from '../Layout'
import './home.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../fireConfig'
import Footer from '../Footer/Footer'
const AllProducts = () => {
  const products=useSelector((state)=>state.storage.products);
  console.log("products",products);
  const [searchKey,setSearchKey]  = useState('');
  const [filterType,setFilterType] = useState('');

  const  [exist , setExist]= useState(null);

const isExist = (id)=>{
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setExist({ ...snapshot.data(), id: snapshot.id });
    });
}

  const AddToCart = (item)=>{
      console.log(item);
    isExist(item.id);
    if(!exist){
    const articleRef = collection(db, "Carts");
    addDoc(articleRef, {
      title:item.title,
      description: item.description,
      price:item.price,
      qty:1,
      imageUrl: item.imageUrl,
    })
      .then(() => {
        toast("Article added successfully", { type: "success" });
      })
      .catch((err) => {
        toast("Error adding article", { type: "error" });
      });
    }
  }

  return (
    <div>
    <Layout>
      <div className="container mt-5">

       <h2 className='main-title'>Our Products</h2>

      {/* <div className='d-flex w-50 align-items-end my-3  justify-content-center'>
        <input type="text "
        value={searchKey}
        onChange={(e)=>{setSearchKey(e.target.value)}}
         className='form-control mx-3' placeholder='Search Items'/>
        <select name="" id="" className='form-control' 
        value={filterType}
        onChange={(e)=>{setFilterType(e.target.value)}}

        >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
        </select>
      </div> */}


      <div  className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
         {
           products.length >0 ? 
           products.map((item)=> ( <div className="card">
  <img src={item.imageUrl} className="card-img-top" width={150} height={250} alt="..." />
  <div className="card-body">
    <h5 className="card-title text-danger">Name: {item.title}</h5>
    <h3 className="card-title">Price:{item.price}</h3>
    <div className='d-flex'>
    <button  className="btn btn-primary" onClick={()=>{AddToCart(item)}}>Add to cart</button>
    <Link to={`/product/${item.id}`} className='btn btn-danger'>view Details</Link>
     </div>
  </div>
</div>))
:
(<>There is no products</>)
           
         }
          
        </div>
      </div>

      </div>
    </Layout>

    <Footer />

    </div>
  )
}

export default AllProducts;