import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Shipping from './pages/Shipping'
import Successful from './pages/Successful'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn'
import UserProfile from "./pages/UserProfile"
import EditProfile from "./pages/EditProfile"

import AdminHome from "./pages/AdminHome"
import AdminProducts from "./pages/AdminProducts"
import AdminUpdate from "./pages/AdminUpdate"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin-products" element={<AdminProducts />} />
        <Route path="/admin-update/:id" element={<AdminUpdate />} />
      </Routes>
      <ToastContainer 
          position="top-center" 
          autoClose={1000} 
          hideProgressBar={true} 
          closeOnClick 
          // pauseOnHover  
          theme="colored" 
        />
    </>
  )
}

export default App
