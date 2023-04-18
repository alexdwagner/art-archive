import React from "react";
import ImagePreview from "./ImagePreview";
import AudioPreview from "./AudioPreview";

const FilePreview = ({ file }) => {
  if (!file) {
    return <div>No files to preview</div>;
  }

  switch (file.type.split("/")[0]) {
    case "image":
      return <ImagePreview file={file} />;
    case "audio":
      return <AudioPreview files={[file]} />;
    default:
      return <div>Unsupported file type</div>;
  }
};

export default FilePreview;
