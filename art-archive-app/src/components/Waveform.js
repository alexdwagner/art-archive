"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const wavesurfer_js_1 = __importDefault(require("wavesurfer.js"));
const Waveform = ({ file, onReady, onAudioProcess, onFinish }) => {
    const waveformRef = (0, react_1.useRef)(null);
    const wavesurfer = (0, react_1.useRef)(null);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false); // Add this line
    (0, react_1.useEffect)(() => {
        if (file) {
            wavesurfer.current = wavesurfer_js_1.default.create({
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
    (0, react_1.useEffect)(() => {
        if (wavesurfer.current) {
            isPlaying ? wavesurfer.current.play() : wavesurfer.current.pause();
        }
    }, [isPlaying]); // Update this line
    // const handlePlayPause = () => {
    //   setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    // };
    return ref;
    {
        waveformRef;
    }
    />;;
};
exports.default = Waveform;
