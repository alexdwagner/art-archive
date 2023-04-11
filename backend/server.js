// Gather necessary ingredients like a chef preparing a dish
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');

// Create the Express app, like building a warehouse for file storage
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS like telling the security guard to let certain visitors in
app.use(cors());

// Enable morgan
app.use(morgan("dev"));

// Configure multer like setting up the warehouse's storage system
const storage = multer.diskStorage({
  // Choose where to store the files, like deciding on a shelf for each item
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // Set the file's name like labeling each box in the warehouse
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration like hiring a warehouse worker
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // When a file is uploaded, send a success message like saying "job well done!"
  res.status(200).send("File uploaded successfully.");
});

app.post('/convert', upload.single('file'), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `uploads/${Date.now()}-converted.mp4`;

  ffmpeg(inputPath)
    .output(outputPath)
    .on('end', () => {
      console.log('Conversion finished');
      res.status(200).send('File converted successfully.');
    })
    .on('error', (err) => {
      console.log('Error:', err.message);
      res.status(500).send('Error converting file.');
    })
    .run();
});

app.get("/uploads", (req, res) => {
  const uploadsDir = path.join(__dirname, "uploads");
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading files:", err);
      res.status(500).send("Error reading files");
      return;
    }

    const fileList = files.map((file) => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      const fileExtension = path.extname(file).slice(1);

      return {
        name: file,
        url: `http://localhost:3001/uploads/${file}`,
        size: stats.size,
        type: fileExtension,
        createdAt: stats.ctime,
      };
    });

    res.set('Content-Type', 'application/json');
    res.json(fileList);
  });
});


console.log("Static files path:", path.join(__dirname, "uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server like opening the warehouse for business
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
