import React, { useState, useCallback, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary'; 
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import FileExplorer from './components/FileExplorer';
import FileUploadForm from './components/FileUploadForm';
import AudioPlayer from './components/AudioPlayer';
import SearchBar from './components/SearchBar';
import { MyFile, Tag } from './types';
import axios from 'axios'; // import axios

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<MyFile[]>([]);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string | null>(null);

  const handleFileDelete = useCallback((id: number) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/media/'); // use axios.get
      const data = response.data; // get data from axios response
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
        <FileExplorer 
  files={files} 
  handleFileDelete={handleFileDelete} 
  handleFileClick={setCurrentAudioSrc}  
/>        {currentAudioSrc && <AudioPlayer src={currentAudioSrc} onPlay={() => { console.log("Playing audio:", currentAudioSrc); }} />}
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
