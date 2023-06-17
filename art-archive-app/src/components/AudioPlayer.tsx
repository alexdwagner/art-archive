import React, { useRef, useEffect } from 'react';

const AudioPlayer = ({ src, onPlay }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('Audio src updated:', src);
    if (src && onPlay) {
      audioRef.current.load();
      audioRef.current.play();
      onPlay();
    }
  }, [src, onPlay]);

  if (!src) {
    return null; // or return a placeholder
  }

  return (
    <audio ref={audioRef} controls>
      <source src={src} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
