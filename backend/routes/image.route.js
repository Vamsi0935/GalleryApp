const multer = require("multer");
const express = require("express");
const path = require("path");
const router = express.Router();
const imageController = require("../controller/image.controller");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "diyrocrqr",
  api_key: "511564186691874",
  api_secret: "YQ6S5frqeWIfBdM__C0ZXu-b0T8",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Invalid mime type. Only JPEG and PNG are allowed."), false);
    }
  },
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "GalleryApp",
    });

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Image uploaded successfully!",
      url: result.secure_url, 
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ error: "Image upload failed." });
  }
});

router.get("/", imageController.getImages);

module.exports = router;
