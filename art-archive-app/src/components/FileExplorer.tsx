import React, { useState } from 'react';
import { MyFile } from '../types';

type FileExplorerProps = {
  files: MyFile[];
  handleFileDelete: (id: number) => void;
};

export default function FileExplorer({ files, handleFileDelete }: FileExplorerProps) {
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);
  const [selectedFileBlob, setSelectedFileBlob] = useState<Blob | null>(null);

  const handleFileSelect = async (file: MyFile) => {
    setSelectedFile(file);
    const response = await fetch(`http://localhost:3001/api/uploads/${file.id}`);
    const blob = await response.blob();
    setSelectedFileBlob(blob);
  };

  return (
    <div>
      {files.map((file) => (
        <div key={file.id}>
          <div>
            <span>{file.name}</span>
            <button onClick={() => handleFileSelect(file)}>
              Open
            </button>
            <button onClick={() => handleFileDelete(file.id)}>
              Delete
            </button>
          </div>
          <div>
            Tags:
            {file.tags.map((tag, index) => (
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