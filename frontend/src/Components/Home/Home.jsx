import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://gallery-app-api.vercel.app/api/images/");
      console.log("Fetched images:", response.data);
      setImages(response.data.images || []);
    } catch (error) {
      console.error("Error fetching images", error);
      setError("Failed to load images. Please try again later.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className="image-gallery">
        <h1 className="display-5 text-center">Our Gallery</h1>
        {error && <p className="text-center text-danger">{error}</p>}
        {images.length > 0 ? (
          <div className="image-grid">
            {images.map((image, index) => (
              <div key={index} className="image-card">
                <img
                  src={`https://gallery-app-api.vercel.app/${image.imageUrl}`}
                  alt={image.imageName || "Untitled"}
                  className="image-thumbnail"
                />
                <div className="image-info">
                  <h3>{image.imageName || "Untitled"}</h3>
                  <p>{image.description || "No description available"}</p>{" "}
                </div>
              </div>
            ))}
          </div>
        ) : (
          !error && <p className="text-center">No images uploaded yet.</p>
        )}
      </div>
    </>
  );
};

export default Home;
