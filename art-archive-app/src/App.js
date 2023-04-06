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

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    await axios.post("http://localhost:3001/upload", formData);
    setSelectedFile(null);
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
    setSelectedPreview(file);
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
