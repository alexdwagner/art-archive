import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ file, onReady, onAudioProcess, onFinish }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Add this line

  useEffect(() => {
    if (file) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'violet',
        progressColor: 'purple',
        cursorColor: 'navy',
        barWidth: 2,
        barHeight: 0.5,
        cursorWidth: 0,
        height: 150,
        barGap: 3,
        normalize: true,
      });

      wavesurfer.current.loadBlob(file);

      wavesurfer.current.on('ready', () => {
        onReady(wavesurfer.current);
      });

      wavesurfer.current.on('audioprocess', onAudioProcess);
      wavesurfer.current.on('finish', onFinish);
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [file, onReady, onAudioProcess, onFinish]);

  useEffect(() => {
    if (wavesurfer.current) {
      isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause();
    }
  }, [isPlaying]); // Update this line

  // const handlePlayPause = () => {
  //   setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  // };

  return <div ref={waveformRef} />;
};

export default Waveform;
