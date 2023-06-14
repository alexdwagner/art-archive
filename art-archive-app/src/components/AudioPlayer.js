"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AudioPlayer = ({ src, onPlay }) => {
    const audioRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        console.log('Audio src updated:', src);
        if (src && onPlay) {
            audioRef.current.load();
            audioRef.current.play();
            onPlay();
        }
    }, [src, onPlay]);
    return ref = { audioRef };
    controls >
        src;
    {
        src;
    }
    />;
    Your;
    browser;
    does;
    not;
    support;
    the;
    audio;
    element.
        < /audio>;
};
;
;
exports.default = AudioPlayer;
