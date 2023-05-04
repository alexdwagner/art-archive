import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import AudioPreview from "./components/AudioPreview";
import FilePreview from "./components/FilePreview";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("setData value: ", setData);
  console.log("setData type: ", typeof setData);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/uploads/");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  console.log("Data before fetch:", data);

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Data after fetch:", data);

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

  return (
    <ErrorBoundary>
      <div className="App">
        <header>
          <h1>Art Archive</h1>
        </header>
        <main className="main">
          {selectedFile && selectedFile.type.startsWith("audio/") ? (
            <AudioPreview file={selectedFile} />
          ) : (
            <FilePreview file={selectedFile} />
          )}
          <div className="form-and-table">
            <FileUploadForm updateData={fetchData} />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FileTable
              data={data.filter(file =>
                file.name.toLowerCase().includes(searchQuery.toLowerCase())
              )}
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
