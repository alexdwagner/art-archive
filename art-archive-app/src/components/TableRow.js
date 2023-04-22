import React from "react";

// TableRow.js
const TableRow = ({
  file,
  onFileClick,
  onDeleteClick,
  columnWidths
}) => {
  const {
    id,
    name,
    size,
    type,
    createdAt,
    tags
  } = file;

  return (
    <tr>
      <td onClick={() => onFileClick(file)}>{name}</td>
      <td>{size}</td>
      <td>{type}</td>
      <td>{createdAt}</td>
      <td>{tags}</td>
      <td>
      <button onClick={() => onDeleteClick(file)}>Delete</button>
      </td>
    </tr>
  );
};


export default TableRow;