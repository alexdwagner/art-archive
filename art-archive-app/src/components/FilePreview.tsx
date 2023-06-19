import React, { FC } from 'react';
import { MyFile } from './types';
import ImagePreview from './ImagePreview';
import AudioPreview from './AudioPreview';

type Props = {
  file: MyFile;
}

const FilePreview: FC<Props> = ({ file }) => {
  const fileObject = new File(
    [file.url],
    file.name,
    { type: file.type, lastModified: file.lastModified }
  );

  switch (file.type.split("/")[0]) {
    case "image":
      return <ImagePreview file={fileObject} />;
    case "audio":
      return <AudioPreview file={fileObject} />;
    default:
      return <div>Unsupported file type</div>;
  }
};

export default FilePreview;
