"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const FileUploadForm = ({ updateData }) => {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0]); // This line will log the selected file
    };
    const handleFileSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const formData = new FormData();
        console.log(selectedFile);
        formData.append('file', selectedFile);
        try {
            const response = yield axios_1.default.post('http://localhost:3001/upload', formData);
            console.log('File upload response:', response);
            // Call the updateData function only if the upload was successful
            if (response.status === 200) {
                setSelectedFile(null);
                updateData();
            }
        }
        catch (error) {
            console.error('File upload error:', error);
        }
    });
    return onSubmit = { handleFileSubmit } >
        type;
    "file";
    onChange = { handleFileUpload } /  >
        type;
    "submit" > Upload < /button>
        < /form>;
};
;
;
exports.default = FileUploadForm;
