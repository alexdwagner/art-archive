import React, { FC } from 'react';

interface VideoPreviewProps {
  src: string;
}

const VideoPreview: FC<VideoPreviewProps> = ({ src }) => (
  <video
    src={src}
    controls
    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
  />
);

export default VideoPreview;
