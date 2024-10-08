import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./addImage.css";

const AddImage = () => {
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedImage = e.dataTransfer.files[0];
      setImage(droppedImage);
      setImagePreview(URL.createObjectURL(droppedImage));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Image Uploaded",
        text: "Your image has been uploaded successfully!",
      });

      console.log(response.data);

      setImageName("");
      setDescription("");
      setImage(null);
      setImagePreview(null);

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: `There was an error uploading your image: ${
          error.response ? error.response.data.error : error.message
        }`,
      });
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="image-container">
        <h1 className="display-5 pb-4 text-center">Add Image</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="imageName" className="form-label">
              Image Name:
            </label>
            <input
              value={imageName}
              type="text"
              className="form-control"
              id="imageName"
              placeholder="Enter Image name"
              onChange={(e) => setImageName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Image Description:
            </label>
            <textarea
              value={description}
              className="form-control"
              id="description"
              rows="3"
              placeholder="Type image description here..."
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div
            className={`upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              </div>
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="file-input"
            onChange={handleFileChange}
            style={{ display: "none" }}
            required
          />
          <div className="button pt-2 d-flex justify-content-center">
            <button type="submit" className="btn btn-outline-secondary">
              Post Image
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddImage;
