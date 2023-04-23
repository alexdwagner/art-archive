import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import AudioPreview from "./components/AudioPreview";
import ImagePreview from "./components/ImagePreview";
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

      setData((prevData) => prevData.filter((item) => item.id !== file.id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openFileCard = (file) => {
    setSelectedFile(file);
    setIsFileCardOpen(true);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>Art Archive</h1>
        </header>
        <main className="main">
          {selectedFile && selectedFile.type.startsWith("audio") ? (
            <AudioPreview file={selectedFile} />
          ) : (
            selectedFile && selectedFile.type.startsWith("image") && <ImagePreview file={selectedFile} />
          )}

          <div className="form-and-table">
            <FileUploadForm updateData={fetchData} />
            <FileTable
              data={data}
              onFileClick={(file) => {
                setSelectedFile(file);
              }}
              columnWidths={[200, 200, 100, 100]}
              onDeleteClick={deleteFile}
              onInfoClick={openFileCard} // Use the new openFileCard function for the "More Info" link
            />
          </div>
        </main>
        <footer>
          <p>&copy; 2023 Art Archive. All rights reserved.</p>
        </footer>
      </div>

      {selectedFile && (
        <Modal isOpen={isFileCardOpen} onClose={() => setIsFileCardOpen(false)}>
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
};

export default App;
