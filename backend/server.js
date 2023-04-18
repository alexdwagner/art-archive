const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');

const app = express();

// Add a custom middleware to add CORS headers to static files
app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
}, express.static(path.join(__dirname, "uploads")));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(morgan("dev"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
