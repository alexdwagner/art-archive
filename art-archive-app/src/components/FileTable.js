import React, { useState } from "react";
import PropTypes from "prop-types";
import { Resizable } from "react-resizable";
import "./FileTable.css";

const FileTable = ({ files, onFileClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <Resizable>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>
                Name {sortConfig.key === "name" && <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>}
              </th>
              <th onClick={() => handleSort("type")}>
                Type {sortConfig.key === "type" && <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>}
              </th>
              <th onClick={() => handleSort("size")}>
                Size {sortConfig.key === "size" && <span>{sortConfig.direction === "ascending" ? "▲" : "▼"}</span>}
              </th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedFiles.map((file) => (
              <tr key={file.name} onClick={() => onFileClick(file)}>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>{file.size}</td>
                <td>{new Date(file.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Resizable>
    </div>
  );
};

FileTable.propTypes = {
  files: PropTypes.array.isRequired,
  onFileClick: PropTypes.func.isRequired,
};

export default FileTable;
