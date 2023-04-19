import React from 'react';

const ImagePreview = ({ file }) => {
  if (!file) {
    return <div>No image to preview</div>;
  }

  const src = URL.createObjectURL(file);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#eee',
      }}
    >
      <img
        src={src}
        alt="preview"
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100%',
          border: '1px solid #ccc',
        }}
        onLoad={() => URL.revokeObjectURL(src)}
      />
    </div>
  );
};

export default ImagePreview;
