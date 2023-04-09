import React from 'react';
// import { ResizableBox } from 'react-resizable';
import './Resizable.css';

export const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];

const FilePreview = ({ file }) => {
  if (!file) {
    return null;
  }

  const renderPreview = () => {
    if (supportedImageFormats.includes(file.type)) {
      return <img src={file.url} alt="preview" style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />;
    } else {
      return <p>Unsupported file type</p>;
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
