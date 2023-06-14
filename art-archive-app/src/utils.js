"use strict";
// utils.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = exports.supportedMimeTypes = exports.getFileMimeType = exports.readableDocumentMimeTypes = exports.textMimeTypes = exports.videoMimeTypes = exports.imageMimeTypes = void 0;
exports.imageMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/svg+xml',
    'image/webp',
];
exports.videoMimeTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
];
exports.textMimeTypes = [
    'text/plain',
    'text/html',
    'text/css',
    'text/javascript',
    'text/csv',
    'text/xml',
];
exports.readableDocumentMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'application/rtf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];
const getFileMimeType = (file) => {
    const fileExtension = file.name
        .toLowerCase()
        .split('.')
        .pop();
    return Object.values(exports.supportedMimeTypes).find((mimeType) => mimeType.includes(fileExtension)) || null;
};
exports.getFileMimeType = getFileMimeType;
// Combine all the MIME types into one object for easier use
exports.supportedMimeTypes = Object.assign(Object.assign(Object.assign(Object.assign({}, exports.imageMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
}, {})), exports.videoMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
}, {})), exports.textMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
}, {})), exports.readableDocumentMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
}, {}));
// utils.js
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
