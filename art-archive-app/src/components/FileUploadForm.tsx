import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

type Props = {
  updateData: () => void; // assuming updateData is a function that takes no arguments and doesn't return anything
}

const FileUploadForm: React.FC<Props> = ({ updateData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>(""); // add this state if you want to include description in your form

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return; // Do not submit if no file is selected
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedFile.name);
    formData.append('description', description); // Adjust this according to your needs
    formData.append('userId', '1'); // Adjust this according to your needs

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);

      if (response.status === 200) {
        console.log('File upload success:', response);
        setSelectedFile(null);
        updateData();
      } else {
        console.error('File upload failed with status:', response.status);
      }
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /> {/* add this input if you want to include description in your form */}
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
