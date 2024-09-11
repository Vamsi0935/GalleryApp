const Image = require("../model/image.model");
const path = require("path");

// Controller to handle image upload
exports.uploadImage = (req, res) => {
  const { imageName, description } = req.body;

  // Check if file and required fields are provided
  if (!req.file || !imageName || !description) {
    return res.status(400).json({
      message: "Image, name, and description are required",
    });
  }

  // Create the image URL based on the uploaded file path
  const imageUrl = `/uploads/${req.file.filename}`;

  // Create a new image document
  const newImage = new Image({
    imageName,
    description,
    imageUrl,
  });

  // Save the image document to the database
  newImage
    .save()
    .then((image) => {
      res.status(201).json({
        message: "Image uploaded successfully",
        image: image,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error saving image to database",
        details: err,
      });
    });
};
exports.getImages = (req, res) => { 
  Image.find()
    .then((images) => {
      res.status(200).json({
        message: "Images retrieved successfully",
        images: images,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error fetching images from database",
        details: err,
      });
    });
};
