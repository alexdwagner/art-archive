import React from "react";

const FilePreview = ({ file }) => {
  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  const isAudio = file.type.startsWith("audio/");

  return (
    <div>
      {isImage && (
        <img src={file.url} alt={file.name} style={{ maxWidth: "100%" }} />
      )}
      {isVideo && (
        <video
          controls
          src={file.url}
          width="100%"
          height="auto"
          type={file.type}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {isAudio && (
        <audio controls>
          <source src={file.url} type={file.type} />
          Your browser does not support the audio element.
        </audio>
      )}
      {!isImage && !isVideo && !isAudio && (
        <p>
          Preview not available.{" "}
          <a href={file.url} download={file.name}>
            Download file
          </a>
        </p>
      )}
    </div>
  );
};

export default FilePreview;
