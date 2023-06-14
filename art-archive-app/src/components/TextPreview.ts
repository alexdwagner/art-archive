import React from 'react';

const TextPreview = ({ src }) => (
  <iframe
    title="text-preview"
    src={src}
    style={{ width: '100%', height: '100%', border: 'none' }}
  />
);

export default TextPreview;
