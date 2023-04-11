import React from 'react';
import './Resizable.css';

export const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];

const fileTypeToMimeType = (fileType) => {
  const fileTypes = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    webp: 'image/webp',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    m4a: 'audio/m4a',
    mp4: 'video/mp4',
    mov: 'video/mov',
    webm: 'video/webm',
    txt: 'text/plain',
    pdf: 'application/pdf',
  };

  return fileTypes[fileType] || null;
};



const FilePreview = ({ file }) => {
  console.log("File in FilePreview:", file);

  if (!file) {
    return null;
  }

  const renderPreview = () => {
    const mimeType = fileTypeToMimeType(file.type);
  
    if (!mimeType) {
      return <p>Unsupported file type</p>;
    }
  
    if (mimeType.startsWith('image')) {
      return (
        <img
          src={file.url}
          alt="preview"
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      );
    } else if (mimeType.startsWith('audio')) {
      return <audio src={file.url} controls style={{ width: '100%' }} />;
    } else if (mimeType.startsWith('video')) {
      return (
        <video
          src={file.url}
          controls
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
        />
      );
    } else if (mimeType === 'text/plain') {
      return (
        <iframe
          title="text-preview"
          src={file.url}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      );
    } else if (mimeType === 'application/pdf') {
      return (
        <iframe
          title="pdf-preview"
          src={file.url}
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {renderPreview()}
    </div>
  );
};

export default FilePreview;