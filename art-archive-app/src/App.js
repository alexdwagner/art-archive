import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import { ResizableBox } from "react-resizable";
import FilePreview, { supportedImageFormats } from "./components/FilePreview";


import "./Itunes.css";
import "./styles.css";

const App = () => {
  const [fileList, setFileList] = useState([]);

  const fetchFileList = async () => {
    try {
      const response = await fetch("http://localhost:3001/uploads");
      const data = await response.json();
      setFileList(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  const updateFileList = () => {
    fetchFileList();
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>Art Archive</h1>
        </header>
        <main className="main">
          <ResizableBox width={500} height={400} minConstraints={[300, 200]}>
            {fileList.length > 0 ? (
              <FilePreview file={fileList.find((file) => supportedImageFormats.includes(file.type))} />
            ) : (
              <div>No files to display</div>
            )}
          </ResizableBox>
          <div className="form-and-table">
            <FileUploadForm updateFileList={updateFileList} />
            <FileTable files={fileList} />
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
