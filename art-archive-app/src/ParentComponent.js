import React, { useState } from 'react';
import FilePreview from './components/FilePreview';
import axios from 'axios';

function ParentComponent() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type === 'video/quicktime') {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://localhost:3001/convert', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('File converted:', response.data);
        })
        .catch((error) => {
          console.error('Error converting file:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <FilePreview file={selectedFile} />}
    </div>
  );
}

export default ParentComponent;
