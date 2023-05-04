import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableActions from "./TableActions";
import { formatBytes } from "../utils";
import "../styles/FileTable.css";
import EditableCell from "./EditableCell";

const FileTable = ({ data, setData, onFileClick, onDeleteClick, columnWidths }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const updateFileName = (index, newName) => {
    const updatedData = [...data];
    updatedData[index].name = newName;
    setData(updatedData);
  };

  if (!data || data.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <table>
      <colgroup>
        {columnWidths.map((width, index) => (
          <col key={`col-${index}`} style={{ width: `${width}px` }} />
        ))}
      </colgroup>
      <TableHeader
        handleSort={handleSort}
        sortConfig={sortConfig}
        columnWidths={columnWidths}
      />
      <tbody>
        {sortedData.map((file, index) => {
          const tags = file.tags?.join(", ");
          const createdAt = file.createdAt
            ? new Date(file.createdAt).toLocaleString()
            : "";
          const size = file.size ? formatBytes(file.size) : "";

          return (
            <tr key={file.id ? `row-${file.id}` : `row-${index}`}>
              <EditableCell
                value={file.name}
                onUpdate={(newName) => updateFileName(index, newName)}
              />
              <td>{tags}</td>
              <td>{createdAt}</td>
              <td>{size}</td>
              <td>
                <TableActions
                  file={file}
                  onFileClick={onFileClick}
                  onDeleteClick={onDeleteClick}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FileTable;
gi