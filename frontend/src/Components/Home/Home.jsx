import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images/");
      setImages(response.data.images || []);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-gallery">
      <h1 className="display-5 text-center">Our Gallery</h1>
      {images.length > 0 ? (
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className="image-card">
              <img
                src={`http://localhost:5000${image.imageUrl}`}
                alt={image.imageName}
                className="image-thumbnail"
              />
              <div className="image-info">
                <h3>{image.imageName}</h3>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No images uploaded yet.</p>
      )}
    </div>
  );
};

export default Home;
