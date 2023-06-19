import React, { useRef, useEffect, ChangeEvent } from "react";
// @ts-ignore
import WaveSurfer from "wavesurfer.js";
import "../styles/AudioPreview.css";
import { MyFile } from './types';

interface Props {
  file: MyFile | null;
}

const AudioPreview = ({ file }: Props): JSX.Element => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (file && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#D9DCFF",
        progressColor: "#4353FF",
        cursorColor: "#4353FF",
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        height: 80,
        barGap: 3,
        plugins: [],
      });

      wavesurfer.current.load(file.url); // Assuming the file's URL is stored in the 'url' property

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [file]);

  const handlePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const handleStop = () => {
    if (wavesurfer.current) {
      wavesurfer.current.stop();
    }
  };

  const handleChangeSpeed = (event: ChangeEvent<HTMLSelectElement>) => {
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(parseFloat(event.target.value));
    }
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(volume);
    }
  };

  if (!file) {
    return <div>Select an audio file...</div>;
  }

  return (
    <div className="audio-preview">
      <div className="waveform-container">
        <div id="waveform" ref={waveformRef} />
      </div>
      <div className="controls">
        <button onClick={handlePlay}>Play/Pause</button>
        <button onClick={handleStop}>Stop</button>
        <label htmlFor="volume">Volume: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={handleVolumeChange}
        />
        <label htmlFor="speed">Speed: </label>
        <select id="speed" defaultValue="1" onChange={handleChangeSpeed}>
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">Normal</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    </div>
  );
};

export default AudioPreview;
