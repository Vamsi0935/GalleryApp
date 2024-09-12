const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://gallery-app-frontend-smoky.vercel.app",
  "*"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:4XQ1CMYTW15lLWHF@cluster0.1kob4.mongodb.net/GalleryApp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Routes
const imageRoutes = require("./routes/image.route");
app.use("/api/images", imageRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000...");
});
