"use strict";
// require('dotenv').config();
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const morgan = require("morgan");
// const fs = require('fs');
// const path = require("path");
// const Sequelize = require('sequelize');
// const util = require('util');
// const { v4: uuidv4 } = require('uuid');
// const FILE_DB_PATH = "./filedb.json";
// // Convert fs methods to Promise-based
// const readdir = util.promisify(fs.readdir);
// const stat = util.promisify(fs.stat);
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: process.env.DB_DIALECT
// });
// const Media = require('./models/Media')(sequelize, Sequelize);
// const Tag = require('./models/Tag')(sequelize, Sequelize);
// const app = express();
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.get("/", (req, res) => {
//   res.send("Hello from the server!");
// });
// if (!fs.existsSync(path.join(__dirname, 'uploads'))){
//     console.error("Uploads directory doesn't exist");
// } else {
//     console.log("Uploads directory exists");
// }
// app.get('/api/uploads', async (req, res) => {
//   try {
//     const fileNames = await readdir(path.join(__dirname, 'uploads'));
//     const files = await Promise.all(fileNames.map(async (fileName) => {
//       const filePath = path.join(__dirname, 'uploads', fileName);
//       let stats;
//       try {
//         stats = await stat(filePath);
//       } catch (err) {
//         console.error(`Error getting stats for file: ${fileName}`, err);
//         throw err;
//       }
//       let mediaItem;
//       try {
//         mediaItem = await Media.findOne({ 
//           where: { url: `uploads/${fileName}` },
//           include: [Tag]
//         });
//       } catch (err) {
//         console.error(`Error fetching media item for file: ${fileName}`, err);
//         throw err;
//       }
//       if (!mediaItem) {
//         console.error(`No Media item found for file: ${fileName}`);
//         return null;
//       }
//       return {
//         name: fileName,
//         size: stats.size,
//         type: path.extname(fileName),
//         createdAt: mediaItem.createdAt,
//         tags: mediaItem.tag.map(tag => tag.name)
//       };
//     }));
//     const filteredFiles = files.filter(file => file !== null);
//     res.json(filteredFiles);
//   } catch (error) {
//     console.error("Error getting file list:", error);
//     res.status(500).send('Error getting file list');
//   }
// });
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.json());
// app.use(morgan("dev"));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });
// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     res.status(400).send('No file was uploaded.');
//     return;
//   }
//   const newMedia = {
//     name: req.file.originalname, 
//     description: "", 
//     url: req.file.path,
//     size: req.file.size,
//     type: req.file.mimetype,
//   };  
//   try {
//     await Media.create(newMedia);
//     res.status(200).send("File uploaded successfully.");
//   } catch (error) {
//     console.error('Error while saving to database:', error);
//     res.status(500).send('Error while saving to database');
//   }
// });
// app.delete("/api/uploads/:id", async (req, res) => {
//   const { id } = req.params;
//   const media = await Media.findOne({ where: { id } });
//   if (!media) {
//     res.status(404).send("File not found");
//     return;
//   }
//   const filePath = path.join(__dirname, "uploads", media.url);
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error("Error deleting file:", err);
//       res.status(500).send("Error deleting file");
//       return;
//     }
//     Media.destroy({ where: { id } });
//     res.status(200).send("File deleted successfully");
//   });
// });
// app.patch("/api/uploads/:id", async (req, res) => {
//   const { id } = req.params;
//   const updatedMedia = req.body;
//   const media = await Media.findOne({ where: { id } });
//   if (!media) {
//     res.status(404).send("File not found");
//     return;
//   }
//   await Media.update(updatedMedia, { where: { id } });
//   res.status(200).send("File updated successfully");
// });
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection to the database has been established successfully.');
//     // Sync database
//     await sequelize.sync();
//     console.log('Database & tables created!');
//     console.log(`Server running on port ${PORT}`);
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });
/////
// Commented out existing code
// ...
// Basic server code
const express = require('express');
const app = express();
const port = 3001;
app.get('/api/uploads', (req, res) => {
    res.json({ message: "Hello from uploads!" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map