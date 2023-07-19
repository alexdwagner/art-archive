import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';

type Props = {
  updateData: () => void;
}

const FileUploadForm: React.FC<Props> = ({ updateData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('name', selectedFile.name);
    formData.append('description', description);

    // Get the file size and append it to formData
    const fileSize = selectedFile.size;
    formData.append('size', String(fileSize));

    // Make sure the size is available before making the POST request
    if (!fileSize) {
      console.error('File size is missing.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/media/', formData);

      if (response.status === 201) {
        console.log('File upload success:', response);
        setSelectedFile(null);
        updateData();
      } else {
        console.error('File upload failed with status:', response.status);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('File upload error:', axiosError);

      if (axiosError.response) {
        const responseData = axiosError.response.data as any;
        if (responseData.error) {
          console.error('Error message from server:', responseData.error);
        }
      }
    }
  };

  return (
    <form onSubmit={handleFileSubmit}>
      <input type="file" onChange={handleFileUpload} />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
