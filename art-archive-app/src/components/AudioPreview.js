import React, { useState } from "react";
import Waveform from "./Waveform";
import PlaybackControls from "./PlaybackControls";

const AudioPreview = ({ files }) => {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  if (!files || files.length === 0) {
    return <div>No files to preview</div>;
  }

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleStop = () => {
    setPlaying(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  console.log("Rendering AudioPreview with files:", files);

  return (
    <div>
      <h2>{files[currentFileIndex].name}</h2>
      <Waveform
        file={files[currentFileIndex]}
        playing={playing}
        onReady={(wavesurfer) => {
          setDuration(wavesurfer.getDuration());
          wavesurfer.setPlaybackRate(playbackRate);
        }}
        onAudioProcess={setCurrentTime}
        onFinish={() => {
          if (currentFileIndex < files.length - 1) {
            setCurrentFileIndex(currentFileIndex + 1);
          }
        }}
      />
      <PlaybackControls
        playing={playing}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        playbackRate={playbackRate}
        onPlaybackRateChange={setPlaybackRate}
      />
      <div>
        Current Time: {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default AudioPreview;
