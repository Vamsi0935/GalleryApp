const Image = require("../model/image.model");

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { imageName, description, imageUrl } = req.body;

    if (!imageName || !description || imageUrl) {
      return res
        .status(400)
        .json({ error: "Image name and description are required" });
    }

    const newImage = new Image({
      imageName,
      description,
      // imagePath: req.file.path,
      imageUrl: req.file.path.replace("uploads/", ""),
      createdAt: new Date(),
    });

    await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
