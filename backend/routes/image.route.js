const multer = require("multer");
const express = require("express");
const path = require("path");
const router = express.Router();
const imageController = require("../controller/image.controller");

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

// Route to upload image
router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/", imageController.getImages);

module.exports = router;
