import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
  file: Blob;
  onReady: (wavesurfer: WaveSurfer) => void;
  onAudioProcess: () => void;
  onFinish: () => void;
}

const Waveform: React.FC<WaveformProps> = ({ file, onReady, onAudioProcess, onFinish }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (file && waveformRef.current) {
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
        if (wavesurfer.current) {
          onReady(wavesurfer.current);
        }
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
  }, [isPlaying]);

  return <div ref={waveformRef} />;
};

export default Waveform;
