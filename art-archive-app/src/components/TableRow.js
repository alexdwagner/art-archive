import React from "react";

const TableRow = ({
  file,
  onFileClick,
  handleCheckboxChange,
  isSelected,
  columnWidths,
}) => {
  const handleRowClick = () => {
    onFileClick(file);
  };

  const handleCheckboxClick = () => {
    handleCheckboxChange(file.id, !isSelected);
  };

  return (
    <tr onClick={handleRowClick}>
      <td>
        <input
          type="checkbox"
          onChange={handleCheckboxClick}
          checked={isSelected}
        />
      </td>
      <td style={{ width: `${columnWidths[0]}px` }}>{file.name}</td>
      <td style={{ width: `${columnWidths[1]}px` }}>{file.type}</td>
      <td style={{ width: `${columnWidths[2]}px` }}>{file.size}</td>
      <td style={{ width: `${columnWidths[3]}px` }}>{file.createdAt}</td>
      <td style={{ width: `${columnWidths[4]}px` }}>{file.tags}</td>
    </tr>
  );
};

export default TableRow;
