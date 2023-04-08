import React from 'react';

const TableRow = ({ file, onFileClick }) => {
  return (
    <tr key={file.name} onClick={() => onFileClick(file)}>
      <td>{file.name}</td>
      <td>{file.type}</td>
      <td>{file.size}</td>
      <td>{new Date(file.createdAt).toLocaleDateString()}</td>
      <td>{file.tags ? file.tags.join(', ') : ''}</td>
    </tr>
  );
};

export default TableRow;
