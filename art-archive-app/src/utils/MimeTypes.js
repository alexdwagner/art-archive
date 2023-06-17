export const supportedImageFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff'];
export const fileTypeToMimeType = (fileType) => {
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
