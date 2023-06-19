import React, { useState, useEffect, useCallback } from 'react';
import { MyFile, Tag } from './types';

export default function FileExplorer() {
  const [files, setFiles] = useState<MyFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<MyFile | null>(null);
  const [selectedFileBlob, setSelectedFileBlob] = useState<Blob | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch('http://localhost:3000/files');
    const data: MyFile[] = await response.json();
    setFiles(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTagUpdate = (id: number, newTags: string[]) => {
    setFiles((prevData) =>
      prevData.map((file) =>
        file.id === id ? { ...file, tags: newTags } : file
      )
    );
  };

  const handleFileDelete = (id: number) => {
    setFiles((prevData) => prevData.filter((file) => file.id !== id));
  };

  const handleFileSelect = async (file: MyFile) => {
    setSelectedFile(file);
    const response = await fetch(`http://localhost:3000/files/${file.id}`);
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
              <span key={index}>{tag}</span>
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
