"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FilePreview = ({ file }) => {
    if (!file) {
        return No;
        files;
        to;
        preview < /div>;;
    }
    switch (file.type.split("/")[0]) {
        case "image":
            return file;
            {
                file;
            }
            />;;
        case "audio":
            return file;
            {
                [file];
            }
            />;;
        default:
            return Unsupported;
            file;
            type < /div>;;
    }
};
exports.default = FilePreview;
