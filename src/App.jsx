import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Navbar component
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";

import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";
import CategoryProduct from "./pages/CategoryProduct";

const App = () => {
  const [location, setLocation] = useState(null);
    const[openDropdown, setOpenDropdown] = useState(false)

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
     // console.log("Coords:", latitude, longitude);

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await axios.get(url);
        const exactLocation = response.data.address;
        setLocation(exactLocation);
       // console.log("Exact Location:", exactLocation);
        setOpenDropdown(false)
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
         <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart location={location} getLocation={getLocation}/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
