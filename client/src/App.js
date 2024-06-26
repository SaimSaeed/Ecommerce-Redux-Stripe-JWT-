import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from "./pages/ProductList"
import Product from "./pages/Product"

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"

function App() {
  // Setting user to true to set a condition for login
  const user = true;

  return (
 <>
 <Router>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/products/:category' element={<ProductList/>}/>
<Route path='/product/:id' element={<Product/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/login' element={user ? <Navigate to="/"/> : <Login/>}/>
<Route path='/register' element={user ? <Navigate to="/"/> : <Register/>}/>



</Routes>
 </Router>

 
 </>
  );
}

export default App;
