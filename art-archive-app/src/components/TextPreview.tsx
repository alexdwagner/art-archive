import React, { FC } from 'react';

interface TextPreviewProps {
  src: string;
}

const TextPreview: FC<TextPreviewProps> = ({ src }) => (
  <iframe
    title="text-preview"
    src={src}
    style={{ width: '100%', height: '100%', border: 'none' }}
  />
);

export default TextPreview;
