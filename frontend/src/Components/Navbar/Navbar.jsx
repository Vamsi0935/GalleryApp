import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary shadow-lg p-2 mb-5 bg-body-tertiary rounded">
        <div className="container">
          <h1 className="display-6">
            <Link to="/" className="text-decoration-none text-dark title">
              Gallery
            </Link>
          </h1>
          <button className="btn btn-outline-success" type="button">
            <Link to="/add-image" className="addImage-btn">
              Add Image
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
