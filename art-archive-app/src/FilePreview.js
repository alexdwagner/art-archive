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
          type={`video/${fileExtension}`}
        >
          Your browser does not support the video tag.
        </video>
      )}
      {isAudio && (
        <audio controls>
          <source src={file.url} type={audioMimeType} />
          Your browser does not support the audio element.
        </audio>
      )}
      {isText && (
        <iframe
          src={file.url}
          title={file.name}
          style={{ width: "100%", height: "400px" }}
        ></iframe>
      )}
      {isPdf && (
        <embed
          src={file.url}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      )}
      {!isImage && !isVideo && !isAudio && !isText && !isPdf && (
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

