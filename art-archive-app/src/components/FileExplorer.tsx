import React, { useState } from 'react';
import { MyFile } from '../types';
import axios from 'axios'; // import axios

type FileExplorerProps = {
  files: MyFile[];
  handleFileDelete: (id: number) => void;
};

export default function FileExplorer({ files, handleFileDelete }: FileExplorerProps) {
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);
  const [selectedFileBlob, setSelectedFileBlob] = useState<Blob | null>(null);

  const handleFileSelect = async (file: MyFile) => {
    setSelectedFile(file);
    
    try {
      const response = await axios.get(`http://localhost:8000/api/media/uploads/${file.id}/`); // use axios.get
      const blob = new Blob([response.data], { type: response.headers['content-type'] }); // create blob from axios response
      setSelectedFileBlob(blob);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Fetch error: ', error.message);
      } else {
        console.error('Fetch error: ', error);
      }
    }
  };  

  // If files is undefined, render a loading message
  if (!files) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(files || []).map((file) => (
        <div key={file.id}>
          <div>
            <span>{file.name}</span>
            <button onClick={() => handleFileSelect(file)}>Open</button>
            <button onClick={() => handleFileDelete(file.id)}>Delete</button>
          </div>
          <div>
            Tags:
            {(file.tags || []).map((tag, index) => (
              <span key={index}>{tag.name}</span>
            ))}
          </div>
        </div>
      ))}

      {selectedFileBlob && (
        <img src={URL.createObjectURL(selectedFileBlob)} alt={selectedFile?.name} />
      )}
    </div>
  );
}
