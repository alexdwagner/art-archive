import React from 'react';

interface PdfPreviewProps {
  src: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ src }) => (
  <iframe
    title="pdf-preview"
    src={src}
    style={{ width: '100%', height: '100%', border: 'none' }}
  />
);

export default PdfPreview;
