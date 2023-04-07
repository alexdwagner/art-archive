import React from "react";

const FileTable = ({ files, sortField, sortDirection, onFileClick }) => {
  const sortedFiles = files.slice().sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    let comparison = 0;

    if (fieldA < fieldB) {
      comparison = -1;
    } else if (fieldA > fieldB) {
      comparison = 1;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onFileClick("name")}>Name</th>
          <th onClick={() => onFileClick("size")}>Size</th>
          <th onClick={() => onFileClick("type")}>Type</th>
        </tr>
      </thead>
      <tbody>
        {sortedFiles.map((file) => (
          <tr key={file.name} onClick={() => onFileClick(file)}>
            <td>{file.name}</td>
            <td>{file.size}</td>
            <td>{file.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileTable;
