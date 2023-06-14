"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const wavesurfer_js_1 = __importDefault(require("wavesurfer.js"));
require("../styles/AudioPreview.css");
const AudioPreview = ({ file }) => {
    const waveformRef = (0, react_1.useRef)(null);
    const wavesurfer = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (file) {
            wavesurfer.current = wavesurfer_js_1.default.create({
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
    const handleVolumeChange = (event) => {
        const volume = parseFloat(event.target.value);
        wavesurfer.current.setVolume(volume);
    };
    if (!file) {
        return Select;
        an;
        audio;
        file;
        /div>;;
    }
    return className = "audio-preview" >
        className;
    "waveform-container" >
        id;
    "waveform";
    ref = { waveformRef } /  >
        /div>
        < div;
    className = "controls" >
        onClick;
    {
        handlePlay;
    }
     > Play / Pause < /button>
        < button;
    onClick = { handleStop } > Stop < /button>
        < label;
    htmlFor = "volume" > Volume;
    /label>
        < input;
    id = "volume";
    type = "range";
    min = "0";
    max = "1";
    step = "0.01";
    defaultValue = "1";
    onChange = { handleVolumeChange }
        /  >
        htmlFor;
    "speed" > Speed;
    /label>
        < select;
    id = "speed";
    defaultValue = "1";
    onChange = { handleChangeSpeed } >
        value;
    "0.5" > 0.5;
    x < /option>
        < option;
    value = "0.75" > 0.75;
    x < /option>
        < option;
    value = "1" > Normal < /option>
        < option;
    value = "1.25" > 1.25;
    x < /option>
        < option;
    value = "1.5" > 1.5;
    x < /option>
        < option;
    value = "2" > 2;
    x < /option>
        < /select>
        < /div>
        < /div>;
};
;
;
exports.default = AudioPreview;
