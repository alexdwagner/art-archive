import React, { useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.spectrogram.min.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';

const AudioPreview = ({ file }) => {
  const waveSurferRef = useRef(null);
  const waveFormRef = useRef(null);

  useEffect(() => {
    if (!waveFormRef.current) {
      return;
    }

    waveSurferRef.current = WaveSurfer.create({
      container: waveFormRef.current,
      waveColor: 'violet',
      progressColor: 'purple',
      cursorColor: 'navy',
      plugins: [
        RegionsPlugin.create(),
        SpectrogramPlugin.create({ container: '#spectrogram' }),
        CursorPlugin.create(),
      ],
    });

    waveSurferRef.current.load(file.url);

    return () => {
      waveSurferRef.current.destroy();
    };
  }, [file]);

  return <div ref={waveFormRef}></div>;
};

export default AudioPreview;
