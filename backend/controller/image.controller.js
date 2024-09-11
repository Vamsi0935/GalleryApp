const Image = require("../model/image.model");

// Controller to handle image upload
exports.uploadImage = (req, res) => {
  const { imageName, description, imageUrl } = req.body;

  if (!imageName || !description || !imageUrl) {
    return res
      .status(400)
      .json({ message: "Image name, description, and image URL are required" });
  }

  const newImage = new Image({
    imageName,
    description,
    imageUrl,
  });

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

// Controller to fetch all images
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

// Controller to get a single image by ID
exports.getImageById = (req, res) => {
  const imageId = req.params.id;

  Image.findById(imageId)
    .then((image) => {
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(200).json(image);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error fetching image from database",
        details: err,
      });
    });
};
