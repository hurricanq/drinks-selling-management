import { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"

import SignUpPage from './pages/SignUpPage'
import LogInPage from './pages/LogInPage'

import ContactPage from './pages/ContactPage'
import AboutUsPage from "./pages/AboutUsPage"

import MenuPage from "./pages/MenuPage"
import DrinkDetailPage from "./pages/DrinkDetailPage"

import CheckoutPage from "./pages/CheckoutPage"
import SuccessfulPage from "./pages/SuccessfulPage"

import ProfilePage from "./pages/ProfilePage"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";

import { useUserStore } from "./stores/useUserStore"
import { useCartStore } from "./stores/useCartStore"

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
	const { cart, getCartItems } = useCartStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		if (!user) return;

		getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

  return (
    <div class="font-outfit">
      <div className="bg-white sticky top-0 z-50">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!user ? <LogInPage /> : <Navigate to='/' />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage />} />

        <Route path="/menu" element={<MenuPage />} />
        <Route path="/drink/:id" element={<DrinkDetailPage />} />

        <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/" />} />
        <Route path="/successful" element={user ? <SuccessfulPage /> : <Navigate to="/" />} />

        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" />} />
      </Routes>

      <Footer />
      <Toaster />
    </div>
  )
}

export default App
