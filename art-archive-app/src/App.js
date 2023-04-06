import React, { useState, useEffect } from "react";
import axios from "axios";
import FilePreview from "./FilePreview";
import "./App.css";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

// Imagine the App component as a store, and this function is a worker that handles file delivery.
const handleFileSubmit = async (event) => {
  // Stop the normal delivery process, because we'll handle it ourselves.
  event.preventDefault();

  // Create a special package to hold the file.
  const formData = new FormData();
  // Put the selected file inside the package.
  formData.append("file", selectedFile);

  try {
    // Send the package to the storage room (server) and wait for a response.
    const response = await axios.post("http://localhost:3001/upload", formData);
    // If everything went well, print the response from the storage room.
    console.log("File upload response:", response);
  } catch (error) {
    // If something went wrong during the delivery, print the error message.
    console.error("File upload error:", error);
  }

  // Empty our hands, because we're done with the current file.
  setSelectedFile(null);
  // Update the list of files available in the store.
  updateFileList();
};

  

  const updateFileList = async () => {
    const { data } = await axios.get("http://localhost:3001/files");
    setFiles(data);
  };

  useEffect(() => {
    updateFileList();
  }, []);

  const handleFileClick = (file) => {
    setSelectedPreview({ ...file, url: `http://localhost:3001/files/${file.name}` });
  };

  return (
    <div className="App">
      <header>
        <h1>Art Archive</h1>
      </header>
      <main className="main">
        <div className="form-and-table">
          <form onSubmit={handleFileSubmit}>
            <input type="file" onChange={handleFileUpload} />
            <button type="submit">Upload</button>
          </form>
          <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Size</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    {files.map((file) => (
      <tr key={file.name} onClick={() => handleFileClick(file)}>
        <td>{file.name}</td>
        <td>{file.size}</td>
        <td>{file.type}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
        {selectedPreview && (
          <div className="preview-container">
            <FilePreview file={selectedPreview} />
          </div>
        )}
      </main>
      <footer>
        <p>&copy; 2023 Art Archive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
