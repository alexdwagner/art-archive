import React from "react";
import ImagePreview from "./ImagePreview";
import AudioPreview from "./AudioPreview";
import { MyFile } from './types'; // import MyFile from types.ts

// Define the props for the FilePreview component
interface FilePreviewProps {
  file?: MyFile; // Use MyFile instead of File
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  if (!file) {
    return <div>No files to preview</div>;
  }

  switch (file.type.split("/")[0]) {
    case "image":
      return <ImagePreview file={file} />;
    case "audio":
      return <AudioPreview file={file} />;
    default:
      return <div>Unsupported file type</div>;
  }
};

export default FilePreview;
