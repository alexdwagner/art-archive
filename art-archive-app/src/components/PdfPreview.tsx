import React from 'react';

const PdfPreview = ({ src }) => (
  <iframe
    title="pdf-preview"
    src={src}
    style={{ width: '100%', height: '100%', border: 'none' }}
  />
);

export default PdfPreview;
