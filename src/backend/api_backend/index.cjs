const express = require("express");
const cors = require("cors");
const app = express();
let fs = require("fs");
const multer = require("multer");
const path = require("path");
const { title } = require("process");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Set up the static directory for serving files (images and uploaded files)
app.use('/uploadedContent', express.static(path.join(__dirname, 'uploadedContent')));
// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "uploadedContent");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir); // Store in 'uploadedContent' directory
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Multer instance for handling file uploads
const upload = multer({ storage });

app.get("/data", (req, res) => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if (err) {
      res.send(err.message);
    } else {
      console.log("checking the data:", JSON.parse(data));
      res.send(JSON.parse(data));
    }
  });
});

// Endpoint for handling multiple file uploads
app.post("/upload", upload.fields([{ name: "image", maxCount: 1 }, { name: "file", maxCount: 1 }]), (req, res) => {
    const newData = {
        Category: req.body.Category,
        type: req.body.type,
        image: req.files["image"] ? `/uploadedContent/${req.files["image"][0].filename}` : null, // Update to match your file storage path
        files: req.files["file"] 
            ? req.files["file"].map((file) => ({
                title: req.body.title || "Default Title", // If title is not provided, default it
                description: req.body.description || "Default Description", // If description is not provided, default it
                creatorName: req.body.creatorName || "Default Creator", // If creatorName is not provided, default it
                views: req.body.views || "0 views", // If views is not provided, default it
                source: `/uploadedContent/${file.filename}`, // Source will be the file name with path
            })) 
            : []
    };

  console.log(req.body);
  // Read the existing data from data.json
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data file");
      return;
    }

    const dataArr = JSON.parse(data);

    // Generate a new ID based on the highest current ID
    const maxId = dataArr.reduce((max, item) => Math.max(max, parseInt(item.id, 10)), 0);
    newData.id = (maxId + 1).toString();

    // Append the new data
    dataArr.push(newData);

    // Write the updated data back to data.json
    fs.writeFile("./data.json", JSON.stringify(dataArr, null, 2), (err) => {
      if (err) {
        res.status(500).send("Error writing data file");
      } else {
        res.status(200).json(newData);
      }
    });
  });
});

let port = 3000;
app.listen(port, () => {
  console.log("server started on port", port);
});
