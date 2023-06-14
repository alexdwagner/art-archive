import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = ({ updateData }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]); // This line will log the selected file
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(selectedFile);
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log('File upload response:', response);

      // Call the updateData function only if the upload was successful
      if (response.status === 200) {
        setSelectedFile(null);
        updateData();
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
