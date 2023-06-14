"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
function ParentComponent() {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file && file.type === 'video/quicktime') {
            const formData = new FormData();
            formData.append('file', file);
            axios_1.default
                .post('http://localhost:3001/convert', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                console.log('File converted:', response.data);
            })
                .catch((error) => {
                console.error('Error converting file:', error);
            });
        }
    };
    return type = "file";
    onChange = { handleFileChange } /  >
        { selectedFile } && file;
    {
        selectedFile;
    }
    />}
        < /div>;
    ;
}
exports.default = ParentComponent;
