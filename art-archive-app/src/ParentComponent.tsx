import React, { useState } from 'react';
import FilePreview from './components/FilePreview';
import axios from 'axios';
import { MyFile } from './types';

function ParentComponent() {
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type === 'video/quicktime') {
        const formData = new FormData();
        formData.append('file', file);

        axios
          .post('http://localhost:3001/convert', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            const myFile: MyFile = {
              id: response.data.id.toString(),
              description: response.data.description,
              tags: response.data.tags,
              url: response.data.url,
              name: file.name,
              type: file.type,
              size: response.data.size,
              createdAt: response.data.createdAt,
              updatedAt: response.data.updatedAt,
              lastModified: response.data.lastModified,
              webkitRelativePath: response.data.webkitRelativePath,
              user: 1,
            }
            setSelectedFile(myFile);
            console.log('File converted:', response.data);
          })
          .catch((error) => {
            console.error('Error converting file:', error);
          });

      }
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
