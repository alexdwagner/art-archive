import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm = ({ updateFileList }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log('File upload response:', response);
    } catch (error) {
      console.error('File upload error:', error);
    }

    setSelectedFile(null);
    updateFileList();
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
