import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import "./AudioPreview.css";

const AudioPreview = ({ file }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (file) {
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

      wavesurfer.current.load(URL.createObjectURL(file));

      return () => {
        wavesurfer.current.destroy();
      };
    }
  }, [file]);

  const handlePlay = () => {
    wavesurfer.current.playPause();
  };

  const handleStop = () => {
    wavesurfer.current.stop();
  };

  const handleChangeSpeed = (event) => {
    wavesurfer.current.setPlaybackRate(parseFloat(event.target.value));
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
