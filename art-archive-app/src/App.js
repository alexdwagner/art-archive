import React, { useState, useEffect } from "react";
import axios from "axios";
import FilePreview from "./FilePreview";
import "./Itunes.css";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

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

    try {
      const response = await axios.post("http://localhost:3001/upload", formData);
      console.log("File upload response:", response);
    } catch (error) {
      console.error("File upload error:", error);
    }

    setSelectedFile(null);
    updateFileList();
  };

  const updateFileList = async () => {
    const { data } = await axios.get("http://localhost:3001/files");
    setFiles(data.map((file) => ({ ...file, type: file.mimetype }))); // Add mimetype as type
  };

  useEffect(() => {
    updateFileList();
  }, []);

  const handleFileClick = (file) => {
    console.log("File clicked:", file);
    setSelectedPreview(file);
  };

  return (
    <div className="App">
      <header>
        <h1>Art Archive</h1>
      </header>
      <main className="main">
        {selectedPreview && (
          <div className="preview-container">
            <ResizableBox width={600} height={400} minConstraints={[300, 200]} maxConstraints={[800, 600]}>
              <FilePreview file={selectedPreview} />
            </ResizableBox>
          </div>
        )}
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
      </main>
      <footer>
        <p>&copy; 2023 Art Archive. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
