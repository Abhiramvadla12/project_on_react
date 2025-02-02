const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const { dbConnect } = require("./db");

dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connection.once("open", () => {
  console.log(`✅ Connected to database: ${mongoose.connection.name}`);
});

const mainDataSchema = new mongoose.Schema({
  id: String,
  Category: String,
  type: String,
  image: String,
  files: [
    {
      title: String,
      description: String,
      creatorName: String,
      views: String,
      source: String,
    },
  ],
});

const mainModel = mongoose.model("main_multimedia", mainDataSchema, "main_multimedia");

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer storage and file size limit
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 40 * 1024 * 1024, // 40MB in bytes
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'video/mp4','image/jpg','audio/mp3'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new Error('Invalid file type'), false);
    }
    callback(null, true);
  },
});

app.get("/data", async (req, res) => {
  try {
    let data = await mainModel.find();
    res.send(data);
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/upload", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), async (req, res) => {
  try {
    const latestEntry = await mainModel.aggregate([
      { $project: { id: { $toInt: "$id" } } }, // Convert `id` to a number
      { $sort: { id: -1 } }, // Sort in descending order
      { $limit: 1 }, // Get only the latest entry
    ]);

    const newId = latestEntry.length ? (latestEntry[0].id + 1).toString() : "17";

    const newData = new mainModel({
      id: String(newId),
      Category: req.body.Category,
      type: req.body.type,
      image: req.files["image"] ? `/${req.files["image"][0].filename}` : null,
      files: req.files["file"]
        ? req.files["file"].map((file) => ({
            title: req.body.title || "Default Title",
            description: req.body.description || "Default Description",
            creatorName: req.body.creatorName || "Default Creator",
            views: req.body.views || "0 views",
            source: `/${file.filename}`,
          }))
        : [],
    });

    await newData.save();
    res.status(200).json(newData);
  } catch (error) {
    console.error("Error saving data:", error);

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).send({ error: 'File size exceeds 40MB limit' });
    }

    res.status(500).send("Error saving data");
  }
});

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server started on port http://localhost:" + port);
});
