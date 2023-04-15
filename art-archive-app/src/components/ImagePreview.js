import React from 'react';

const ImagePreview = ({ src }) => {
  return (
    <img
      src={src}
      alt="preview"
      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
    />
  );
};

export default ImagePreview;
