import React,{useState} from 'react'
import Layout from '../Layout'
import './home.css'
import { useSelector } from 'react-redux'
const Home = () => {
  const products=useSelector((state)=>state.storage.products);
  console.log("products",products);
  const [searchKey,setSearchKey]  = useState('');
  const [filterType,setFilterType] = useState('');
  return (
    <Layout>
      <div className="container mt-5">


      <div className='d-flex w-50 align-items-end my-3  justify-content-center'>
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
      </div>


      <div  className="row">
        <div className="col-sm-12 col-md-6 col-lg-4">
         {
           products.length >0 ? 
           products
   .map((item)=> ( <div className="card">
  <img src={item.imageUrl} className="card-img-top" width={150} height={250} alt="..." />
  <div className="card-body">
    <h5 className="card-title text-danger">{item.title}</h5>
    <h3 className="card-title">{item.price}</h3>
    <a href="#" className="btn btn-primary">Add to cart</a>
  </div>
</div>))
:
(<>There is no products</>)
           
         }
          
        </div>
      </div>

      </div>
    </Layout>
  )
}

export default Home