"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTypeToMimeType = exports.supportedImageFormats = void 0;
exports.supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];
const fileTypeToMimeType = (fileType) => {
    const fileTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
        webp: 'image/webp',
        tiff: 'image/tiff',
        svg: 'image/svg+xml',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        m4a: 'audio/m4a',
        mp4: 'video/mp4',
        mov: 'video/mov',
        webm: 'video/webm',
        txt: 'text/plain',
        pdf: 'application/pdf',
    };
    return fileTypes[fileType] || null;
};
exports.fileTypeToMimeType = fileTypeToMimeType;
