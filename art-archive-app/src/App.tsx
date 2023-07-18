import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import FileExplorer from './components/FileExplorer';
import FileUploadForm from './components/FileUploadForm';
import SearchBar from './components/SearchBar';
import { MyFile, Tag } from './types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<MyFile[]>([]);

  const handleFileDelete = useCallback((id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/media/');
      console.log(response.headers.get('Content-Type')); // should log 'application/json'
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setFiles(data);
      console.log('Set files:', data);
    } catch (error) {
      console.error('Fetch operation failed: ', error);
    }
  }, []);
  

  const updateData = fetchData;

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <ErrorBoundary>
      <div className="App">
        <Header />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FileUploadForm updateData={updateData} />
        <FileExplorer files={files} handleFileDelete={handleFileDelete} />
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
