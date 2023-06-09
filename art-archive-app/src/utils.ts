export const imageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/webp',
];

export const videoMimeTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
];

export const textMimeTypes = [
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'text/csv',
  'text/xml',
];

export const readableDocumentMimeTypes = [
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

interface File {
  name: string;
}

export const getFileMimeType = (file: File): string | null => {
  const fileExtension = file.name
    .toLowerCase()
    .split('.')
    .pop();

  return Object.values(supportedMimeTypes).find((mimeType) =>
    mimeType.includes(fileExtension || '')
  ) || null;
};

interface MimeTypes {
  [key: string]: string;
}

// Combine all the MIME types into one object for easier use
export const supportedMimeTypes: MimeTypes = {
  ...imageMimeTypes.reduce((acc: MimeTypes, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...videoMimeTypes.reduce((acc: MimeTypes, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...textMimeTypes.reduce((acc: MimeTypes, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...readableDocumentMimeTypes.reduce((acc: MimeTypes, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
};

// utils.js
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
