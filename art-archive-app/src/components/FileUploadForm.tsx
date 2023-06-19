import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

type Props = {
  updateData: () => void; // assuming updateData is a function that takes no arguments and doesn't return anything
}

const FileUploadForm: React.FC<Props> = ({ updateData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    if(event.target.files) console.log(event.target.files[0]);
  };

  const handleFileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
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
