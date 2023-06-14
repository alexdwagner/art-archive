"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// PlaybackControls.js
const PlaybackControls = ({ playing, onPlayPause, onStop, playbackRate, onPlaybackRateChange, }) => {
    const handlePlaybackRateChange = (e) => {
        onPlaybackRateChange(parseFloat(e.target.value));
    };
    return onClick = { onPlayPause } > { playing, 'Pause': 'Play' } < /button>
        < button;
    onClick = { onStop } > Stop < /button>
        < label;
    htmlFor = "playback-rate" > Playback;
    Rate: /label>
        < select;
    id = "playback-rate";
    value = { playbackRate };
    onChange = { handlePlaybackRateChange }
        >
            value;
    "0.5" > 0.5;
    x < /option>
        < option;
    value = "1" > 1;
    x < /option>
        < option;
    value = "1.5" > 1.5;
    x < /option>
        < option;
    value = "2" > 2;
    x < /option>
        < /select>
        < /div>;
};
;
;
exports.default = PlaybackControls;
