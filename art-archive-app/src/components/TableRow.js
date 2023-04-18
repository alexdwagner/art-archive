import React from 'react';

const TableRow = ({ file, onFileClick, columnWidths }) => {

  const handleClick = () => {
    console.log("File data in TableRow onClick:", file);
    onFileClick(file);
  };

  return (
    <tr
      className="file-table-row"
      onClick={handleClick} // Use the handleClick function here
    >
      <td style={{ width: columnWidths[0] }}>{file.name}</td>
      <td style={{ width: columnWidths[1] }}>{file.type}</td>
      <td style={{ width: columnWidths[2] }}>{file.size} bytes</td>
    </tr>
  );
};

export default TableRow;

