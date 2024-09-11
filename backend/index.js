const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "https://gallery-app-frontend-smoky.vercel.app",
        "https://localhost:3000",
      ];
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

mongoose
  .connect(
    "mongodb+srv://dvkrishna142000:4XQ1CMYTW15lLWHF@cluster0.1kob4.mongodb.net/GalleryApp?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const imageRoutes = require("./routes/image.route");
app.use("/api/images", imageRoutes);

app.listen(5000, () => {
  console.log("Server running...");
});
