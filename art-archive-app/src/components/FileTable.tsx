import React, { useState } from 'react';
import TableRow from './TableRow';
import { MyFile } from './types';

type Props = {
  data?: MyFile[];
  onFileClick: (file: MyFile) => void;
  onDeleteClick: (file: MyFile) => void;
  onUpdate: (file: MyFile) => void;
}

const FileTable: React.FC<Props> = ({
  data = [], // Add a default value for data
  onFileClick,
  onDeleteClick,
  onUpdate,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Tags</th>
          <th>URL</th>
          <th>Size</th>
          <th>Type</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Last Modified</th>
          <th>Path</th>
        </tr>
      </thead>
      <tbody>
        {data.map((file) => (
          <TableRow
            key={file.id}
            file={file}
            onFileClick={onFileClick}
            onDeleteClick={onDeleteClick}
            onUpdate={onUpdate}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
