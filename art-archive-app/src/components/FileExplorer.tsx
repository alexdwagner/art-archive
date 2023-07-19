import React, { useState } from 'react';
import { MyFile } from '../types';
import axios from 'axios';

type FileExplorerProps = {
  files: MyFile[];
  handleFileDelete: (id: number) => void;
  handleFileClick: (src: string) => void;
};

const FileExplorer: React.FC<FileExplorerProps> = ({ files, handleFileDelete, handleFileClick }) => {
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);
  const [selectedFileBlob, setSelectedFileBlob] = useState<Blob | null>(null);

  const handleFileSelect = async (file: MyFile) => {
    setSelectedFile(file);
    handleFileClick(`http://localhost:8000/api/media/uploads/${file.id}/`);

    try {
      const url = `http://localhost:8000/api/media/uploads/${file.id}/`;
      console.log("Requesting file from:", url);
      const response = await axios.get(url, { responseType: 'blob' });      
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      setSelectedFileBlob(blob);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Fetch error: ', error.message);
      } else {
        console.error('Fetch error: ', error);
      }
    }
  };

  return (
    <div>
      {files.map(file => (
        <div key={file.id}>
          <div>
            <span>{file.name}</span>
            <button onClick={() => handleFileSelect(file)}>Open</button>
            <button onClick={() => handleFileDelete(file.id)}>Delete</button>
          </div>
          <div>
            Tags:
            {file.tags && file.tags.map((tag, index) => (
              <span key={index}>{tag.name}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;
