import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import { ResizableBox } from "react-resizable";
import FilePreview from "./components/FilePreview";

import "./Itunes.css";
import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/uploads");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = () => {
    fetchData();
  };

  // Log the data being passed to FileTable
  console.log("Data being passed to FileTable:", data);

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>Art Archive</h1>
        </header>
        <main className="main">
          <ResizableBox width={500} height={400} minConstraints={[300, 200]}>
            {selectedFile ? (
              <FilePreview file={selectedFile} />
            ) : (
              <div>No file selected</div>
            )}
          </ResizableBox>
          <div className="form-and-table">
            <FileUploadForm updateData={updateData} />
            <FileTable
              data={data}
              onFileClick={(file) => setSelectedFile(file)}
              columnWidths={[200, 200, 100]}
            />
          </div>
        </main>
        <footer>
          <p>&copy; 2023 Art Archive. All rights reserved.</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
};

export default App;
