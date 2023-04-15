import React from 'react';

const AudioPreview = ({ file }) => {
  return (
    <div>
      <audio controls>
        <source src={file.url} type={file.type} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPreview;