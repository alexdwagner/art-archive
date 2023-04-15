import React from 'react';

const VideoPreview = ({ src }) => (
  <video
    src={src}
    controls
    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
  />
);

export default VideoPreview;
