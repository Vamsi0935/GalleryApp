const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000, https://gallery-app-frontend-smoky.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
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
