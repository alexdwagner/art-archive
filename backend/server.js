require('dotenv').config();

const Sequelize = require('sequelize');
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs');
const path = require("path");
const ffmpeg = require('fluent-ffmpeg');
const { v4: uuidv4 } = require('uuid');
const FILE_DB_PATH = "./filedb.json";
const File = require('./models/User');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

const User = require('./models/User')(sequelize, Sequelize.DataTypes);

const readFilesData = () => {
  try {
    const fileContent = fs.readFileSync(FILE_DB_PATH, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading file database:", error);
    return [];
  }
};

let files = readFilesData();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
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
  if (!req.file) {
    res.status(400).send('No file was uploaded.');
    return;
  }
  const file = {
    id: uuidv4(), 
    name: req.file.originalname,
    path: req.file.path
  };
  
  files.push(file);
  fs.writeFileSync(FILE_DB_PATH, JSON.stringify(files));
  
  res.status(200).send("File uploaded successfully.");
});

app.get("/uploads", (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, "uploads");
    const filesData = readFilesData();

    const fileList = filesData.map((fileData) => {
      const filePath = path.join(uploadsDir, fileData.name);
      try {
        const stats = fs.statSync(filePath);
        const fileExtension = path.extname(fileData.name).slice(1);

        return {
          id: fileData.id,
          name: fileData.name,
          url: `http://localhost:3001/uploads/${fileData.name}`,
          size: stats.size,
          type: fileExtension,
          createdAt: stats.ctime,
        };
      } catch (error) {
        console.error(`Error reading file data for ${filePath}:`, error);
        return null; // return null for files that caused an error
      }
    }).filter(file => file !== null); // remove null entries from the fileList

    res.json(fileList);
  } catch (error) {
    console.error("Error getting file list:", error);
    res.status(500).json({ message: "Error getting file list" });
  }
});

app.delete("/uploads/:id", (req, res) => {
  const { id } = req.params;

  const fileIndex = files.findIndex((file) => file.id == id);

  if (fileIndex === -1) {
    res.status(404).send("File not found");
    return;
  }

  const fileName = files[fileIndex].name;
  const filePath = path.join(__dirname, "uploads", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      res.status(500).send("Error deleting file");
      return;
    }

    // Remove the file from the files array
    files = files.filter((file) => file.id != id);

    // Save the updated files array to disk
    fs.writeFileSync(FILE_DB_PATH, JSON.stringify(files));

    res.status(200).send("File deleted successfully");
  });
});

if (fs.existsSync(FILE_DB_PATH)) {
  const fileData = fs.readFileSync(FILE_DB_PATH, "utf8");
  files = JSON.parse(fileData);
}

app.patch("/uploads/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedFile = req.body;

  console.log(`Received id: ${id}`);
  console.log(`Received updated file: ${JSON.stringify(updatedFile)}`);

  // Find the file with the matching id
  const fileIndex = files.findIndex((file) => file.id === id);

  console.log(`Files after update: ${JSON.stringify(files)}`);

  // If the file is not found, return a 404 error
  if (fileIndex === -1) {
    res.status(404).send("File not found");
    return;
  }

  // Update the file's information in the files array
  files[fileIndex] = { ...files[fileIndex], ...updatedFile };

  // Save the updated files array to disk
  fs.writeFileSync(FILE_DB_PATH, JSON.stringify(files));

  // Send a success response
  res.status(200).send("File updated successfully");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
