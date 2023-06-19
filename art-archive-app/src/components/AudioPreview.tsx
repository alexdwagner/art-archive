import React, { FC } from 'react';

type Props = {
  file: File;
}

const AudioPreview: FC<Props> = ({ file }) => {
  if (!file) {
    return <div>No audio to preview</div>;
  }

  const src = URL.createObjectURL(file);

  return (
    <audio
      controls
      src={src}
      onLoad={() => URL.revokeObjectURL(src)}
    >
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};

export default AudioPreview;
