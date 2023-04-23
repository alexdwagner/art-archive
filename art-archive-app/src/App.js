import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import AudioPreview from "./components/AudioPreview";
import FilePreview from "./components/FilePreview";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./Itunes.css";
import "./styles.css";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileCardOpen, setIsFileCardOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/uploads/");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  const deleteFile = async (file) => {
    try {
      const response = await fetch(`http://localhost:3001/uploads/${file.name}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Remove the deleted file from the data state
      setData((prevData) => prevData.filter((item) => item.id !== file.id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchFileBlob = async (url) => {
    console.log("Fetching file:", url);
    try {
      const response = await fetch(url);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.blob();
    } catch (error) {
      console.error("Error fetching file blob:", error);
    }
  };

  console.log("Data being passed to FileTable:", data);

  const handleRowDoubleClick = (file) => {
    setSelectedFile(file);
    setIsFileCardOpen(true);
  };

  const closeFileCard = () => {
    setIsFileCardOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>Art Archive</h1>
        </header>
        <main className="main">
        {selectedFile && (
  <FilePreview file={selectedFile} />
)}

          <div className="form-and-table">
            <FileUploadForm updateData={fetchData} />
            <FileTable
              data={data}
              onFileClick={async (file) => {
                console.log("File data in onFileClick:", file);
                const blob = await fetchFileBlob(file.url);
                console.log("Blob data:", blob);
                setSelectedFile(
                  new File([blob], file.name, { type: blob.type })
                );
              }}
              columnWidths={[200, 200, 100]}
              onDeleteClick={deleteFile}
              onRowDoubleClick={handleRowDoubleClick}
            />
          </div>
        </main>
        <footer>
          <p>&copy; 2023 Art Archive. All rights reserved.</p>
        </footer>
      </div>
  
      {/* File card modal */}
      {selectedFile && (
        <Modal isOpen={isFileCardOpen} onClose={closeFileCard}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>File Metadata</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Name: {selectedFile.name}</p>
              <p>URL: {selectedFile.url}</p>
              <p>Size: {selectedFile.size} bytes</p>
              <p>Type: {selectedFile.type}</p>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </ErrorBoundary>
  );
      }
      
      export default App;