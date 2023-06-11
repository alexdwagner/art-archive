import React, { useState, useEffect } from "react";
import FileUploadForm from "./FileUploadForm";
import SearchBar from "./SearchBar";
import FileTable from "./FileTable";
import AudioPreview from "./AudioPreview";
import FilePreview from "./FilePreview";

const API_URL = "http://localhost:3001";

const Main = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const onRefreshButtonClick = () => {
    fetchData();
  };

  // This useEffect will log the selectedFile state whenever it changes
  useEffect(() => {
    console.log('selectedFile:', selectedFile);
  }, [selectedFile]);

// This function fetches data from the uploads endpoint of your API.
const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/uploads/`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);  
    setData(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Error fetching file list:", error);
    setData([]); 
  }
};

useEffect(() => {
  fetchData();
}, []);

// This function fetches a blob from a specific URL. 
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

// This function updates a file with new tags
// This function updates a file with new tags
const onUpdate = async (id, newTags) => {
  const originalFile = data.find((file) => file.id === id);
  if (!originalFile) {
    console.error("File not found:", id);
    return;
  }

  const updatedFile = { ...originalFile, tags: newTags };

  try {
    const response = await fetch(`${API_URL}/api/uploads/${id}`, {
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

// This function deletes a file
// This function deletes a file
const onDeleteClick = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/uploads/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    setData((prevData) => prevData.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

  return (
    <main className="main">
      {selectedFile && selectedFile.type.startsWith("audio/") ? (
        <AudioPreview file={selectedFile} />
      ) : (
        <FilePreview file={selectedFile} />
      )}
      <div className="form-and-table">
        <FileUploadForm updateData={fetchData} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Refresh button */}
        <button onClick={onRefreshButtonClick}>Refresh</button>
        <FileTable
          data={data.filter(
            (file) =>
              file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (file.tags && file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          )}
          onFileClick={async (file) => {
            try {
              const blob = await fetchFileBlob(file.url);
              setSelectedFile(new File([blob], file.name, { type: blob.type }));
            } catch (error) {
              console.error("Error fetching file blob:", error);
            }
          }}
                    onUpdate={onUpdate}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </main>
  );
 }

 export default Main;