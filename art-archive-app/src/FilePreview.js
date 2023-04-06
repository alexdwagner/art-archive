import React from "react";

const FilePreview = ({ file }) => {
  console.log(file); // <-- add this line
  return (
    <div className="file-preview">
      <h2>{file.name}</h2>
      <div className="image-container">
        <img src={file.url} alt={file.name} />
      </div>
    </div>
  );
};

export default FilePreview;