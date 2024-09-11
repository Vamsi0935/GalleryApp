import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import AddImage from "./Components/AddImage/AddImage";
import Footer from "./Components/Footer/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-image" element={<AddImage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
