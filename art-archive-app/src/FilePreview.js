import React from "react";

const FilePreview = ({ file }) => {
  const fileExtension = file.type.toLowerCase();

  const isImage = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(fileExtension);
  const isVideo = ["mp4", "webm", "ogg", "mov"].includes(fileExtension);
  const isAudio = ["m4a", "wav", "mp3"].includes(fileExtension);
  const audioMimeType = isAudio ? `audio/${fileExtension === 'm4a' ? 'mp4' : fileExtension}` : null;
  const isText = ["txt", "rtf", "md"].includes(fileExtension);
  const isPdf = fileExtension === "pdf";

  return (
    <div className="FilePreview">
      <div className="FilePreview-wrapper">
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
        {isText && (
          <iframe
            src={file.url}
            title={file.name}
            width="100%"
            height="100%"
            frameborder="0"
          ></iframe>
        )}
        {!isImage && !isVideo && !isAudio && !isText && (
          <p>
            Preview not available.{" "}
            <a href={file.url} download={file.name}>
              Download file
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default FilePreview;