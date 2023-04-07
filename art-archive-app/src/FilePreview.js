import React from 'react';

function FilePreview({ file }) {
  const fileExtension = file.name.split('.').pop().toLowerCase();

  const renderPreview = () => {
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff'].includes(fileExtension)) {
      return <img src={file.url} alt="preview" />;
    } else if (['mp4', 'webm', 'ogv'].includes(fileExtension)) {
      return (
        <video width="320" height="240" controls>
          <source src={file.url} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
      return (
        <audio controls>
          <source src={file.url} type={`audio/${fileExtension}`} />
          Your browser does not support the audio tag.
        </audio>
      );
    } else if (['txt', 'csv', 'json', 'xml'].includes(fileExtension)) {
      return (
        <iframe
          title="text-preview"
          src={file.url}
          width="100%"
          height="400"
          frameBorder="0"
        ></iframe>
      );
    } else if (['pdf'].includes(fileExtension)) {
      return (
        <embed
          src={file.url}
          type="application/pdf"
          width="100%"
          height="600"
        ></embed>
      );
    } else {
      return <p>Unsupported file type</p>;
    }
  };

  return <div>{renderPreview()}</div>;
}

export default FilePreview;
