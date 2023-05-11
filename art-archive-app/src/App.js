import React, { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FileTable from "./components/FileTable";
import FileUploadForm from "./components/FileUploadForm";
import AudioPreview from "./components/AudioPreview";
import FilePreview from "./components/FilePreview";
import SearchBar from "./components/SearchBar";

const API_URL = "http://localhost:3001";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/uploads/");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching file list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchFileBlob = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.blob();
    } catch (error) {
      console.error("Error fetching file blob:", error);
    }
  };

  const onUpdate = async (id, newTags) => {
    const originalFile = data.find((file) => file.id === id);
    if (!originalFile) {
      console.error("File not found:", id);
      return;
    }
  
    const updatedFile = { ...originalFile, tags: newTags };
  
    try {
      const response = await fetch(`${API_URL}/uploads/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFile),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedFile : item))
      );
    } catch (error) {
      console.error("Error updating file:", error);
    }
  };
  

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
              data={data.filter(
                (file) =>
                  file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (file.tags && file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
              )}
              onFileClick={async (file) => {
                const blob = await fetchFileBlob(file.url);
                setSelectedFile(new File([blob], file.name, { type: blob.type }));
              }}
              onDeleteClick={deleteFile}
              onUpdate={async (id, updatedFile) => {
                try {
                  const response = await fetch(`${API_URL}/uploads/${id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFile),
                  });

                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }

                  setData((prevData) =>
                    prevData.map((item) => (item.id === id ? updatedFile : item))
                  );
                } catch (error) {
                  console.error("Error updating file:", error);
                }
              }}
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
