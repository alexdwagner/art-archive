import React from 'react';
import { fileTypeToMimeType } from '../utils/MimeTypes';
import ImagePreview from './ImagePreview';
import AudioPreview from './AudioPreview';
import VideoPreview from './VideoPreview';
import TextPreview from './TextPreview';
import PdfPreview from './PdfPreview';

const FilePreview = ({ file }) => {
  const renderPreview = () => {
    const mimeType = fileTypeToMimeType(file.type);

    if (!mimeType) {
      return <p>Unsupported file type</p>;
    }

    if (mimeType.startsWith('image')) {
      return <ImagePreview src={file.url} />;
    } else if (mimeType.startsWith('audio')) {
      return <AudioPreview file={file} />;
    } else if (mimeType.startsWith('video')) {
      return <VideoPreview src={file.url} />;
    } else if (mimeType === 'text/plain') {
      return <TextPreview src={file.url} />;
    } else if (mimeType === 'application/pdf') {
      return <PdfPreview src={file.url} />;
    }
  };

  return (
    <div className="preview-container">
      {renderPreview()}
    </div>
  );
};

export default FilePreview;
