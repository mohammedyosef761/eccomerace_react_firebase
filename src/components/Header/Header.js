import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import {BsList} from 'react-icons/bs'
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../../fireConfig';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import {FaShoppingCart} from 'react-icons/fa';



const Header = () => {
  const [user] = useAuthState(auth);

  const admins=useSelector((state)=>state.storage.admin);
  const carts= useSelector((state)=>state.storage.carts);
  // console.log("admins",admins);

   let f1=null;
  let existAdmin = ()=>{
    admins.map((item)=>{
      // console.log("No");
      if(item.admin===user.email){
        f1=1;
        // console.log("yes");
      }
    })
    return false;
  }

  let name= (email)=>{
    let str="";
    for(let i=0;i<email.length;i++){
      if(email[i]==='@')return str;
      str+=email[i];
    }
    return str;
  }
  
  let f=existAdmin();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Electronics Store</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <BsList color={"white"}/>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto">
        
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        {
         !user ?( <>
         <Link className="nav-link"  aria-current="page" to="/register">Register</Link>
        <Link className="nav-link"   aria-current="page" to="/login">Login</Link></>
        ):(

           <>
           {f1 && <Link className="nav-link" to="/addProduct">Create-Product</Link>}
           <Link to='/cart' className='nav-link'><FaShoppingCart color={"white"}/>
           {carts.length}
           </Link>
           <Link className="nav-link"  aria-current="page" to="/admin" >{name(user.email)}</Link>
           <Link className="nav-link"   aria-current="page" to="/"   onClick={()=>{signOut(auth)}}>Logout</Link>
           </>
        ) 
        }
      </div>
    </div>
  </div>
</nav>
  )
}

export default Header