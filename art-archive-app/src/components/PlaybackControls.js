import React from 'react';

// PlaybackControls.js
const PlaybackControls = ({
  playing,
  onPlayPause,
  onStop,
  playbackRate,
  onPlaybackRateChange,
}) => {
  const handlePlaybackRateChange = (e) => {
    onPlaybackRateChange(parseFloat(e.target.value));
  };

  return (
    <div>
      <button onClick={onPlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <button onClick={onStop}>Stop</button>
      <label htmlFor="playback-rate">Playback Rate:</label>
      <select
        id="playback-rate"
        value={playbackRate}
        onChange={handlePlaybackRateChange}
      >
        <option value="0.5">0.5x</option>
        <option value="1">1x</option>
        <option value="1.5">1.5x</option>
        <option value="2">2x</option>
      </select>
    </div>
  );
};

export default PlaybackControls;

