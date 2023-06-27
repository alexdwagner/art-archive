import React, { useState, useCallback, useEffect } from 'react';
import ErrorBoundary from '../src/components/ErrorBoundary'; 
import Header from '../src/components/Header'; 
import Footer from '../src/components/Footer'; 
import FileExplorer from '../src/components/FileExplorer';
import FileUploadForm from '../src/components/FileUploadForm';
import SearchBar from '../src/components/SearchBar';
import { MyFile, Tag } from '../src/components/types';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<MyFile[]>([]);

  const handleFileDelete = useCallback((id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    // TODO: Fetch the files from the server and update the state
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
