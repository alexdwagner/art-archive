// utils.js

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

export const getFileMimeType = (file) => {
  const fileExtension = file.name
    .toLowerCase()
    .split('.')
    .pop();

  return Object.values(supportedMimeTypes).find((mimeType) =>
    mimeType.includes(fileExtension)
  ) || null;
};


// Combine all the MIME types into one object for easier use
export const supportedMimeTypes = {
  ...imageMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...videoMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...textMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
  ...readableDocumentMimeTypes.reduce((acc, mimeType) => {
    const fileExtension = mimeType.split("/")[1];
    acc[fileExtension] = mimeType;
    return acc;
  }, {}),
};
