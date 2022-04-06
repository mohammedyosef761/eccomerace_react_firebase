import './App.css';
import Layout from './components/Layout';

import {BrowserRouter as Router , Routes,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import AddProduct from './components/AddProduct/AddProduct';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Admin from './components/Admin.js/Admin';
import ProductDetails from './components/Home/ProductDetails';
import AllProducts from './components/Home/AllProducts';
import Cart from './components/Cart/Cart';

function App() {
  return (
    <Router>
     {/* <Layout /> */}
     <Routes >
       <Route exact path='/' element={<AllProducts/>} />
       <Route  exact path='/addProduct' element={<AddProduct />}/>
       <Route  exact path='/register' element={<Register />}/>
       <Route  exact path='/login' element={<Login />}/>
       <Route  exact path='/admin' element={<Admin />}/>
       <Route  exact path='/product/:id' element={<ProductDetails />}/>
       <Route  exact path='/cart' element={<Cart />}/>
     </Routes>
    </Router>
  );
}

export default App;
