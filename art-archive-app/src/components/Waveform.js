import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

const Waveform = ({ file, playing, onReady, onAudioProcess, onFinish }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (file) {
      console.log('Waveform - file:', file); // Add this line

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
      playing ? wavesurfer.current.play() : wavesurfer.current.pause();
    }
  }, [playing]);

  return <div ref={waveformRef} />;
};

export default Waveform;
