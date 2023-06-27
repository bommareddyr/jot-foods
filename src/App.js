import './App.css';
import React, { useState } from 'react';
import Navbar from './pages/navigationBar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from './pages/Home';
import Menu from './pages/Menu';
import AboutUs from './pages/aboutUs';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './pages/Footer';

function App() {

  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (updatedCartItems) => {
    console.log(updatedCartItems);
    setCartItems(updatedCartItems);
  };

  const handleRemoveOneFromCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };



  return (
    <div className="App">
      <BrowserRouter>
        <MainContent cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onAddToCart={handleAddToCart} onRemoveOneFromCart={handleRemoveOneFromCart} />
      </BrowserRouter>
    </div>
  );
}

function MainContent({ cartItems, onRemoveFromCart, onAddToCart, onRemoveOneFromCart }) {
  const location = useLocation();
  const hideNavbarAndFooter = ["/Login", "/SignUp"].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu onAddToCart={onAddToCart} />} />
        <Route path="/Cart" element={<Cart cartItem={cartItems} onRemoveFromCart={onRemoveFromCart} onAddToCart={onAddToCart} onRemoveOneFromCart={onRemoveOneFromCart} />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default App;
