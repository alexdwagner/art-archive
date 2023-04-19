import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableActions from "./TableActions";

const FileTable = ({ data, onFileClick, columnWidths }) => {
  console.log("Received props:", { data, onFileClick, columnWidths });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (name) => {
    setSelectedRows((prevState) => prevState.filter((row) => row.name !== name));
  };

  if (!data || data.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

  const definedData = data.filter((item) => {
    if (!item) {
      console.warn("Undefined data item found:", item);
      return false;
    }
    return item.hasOwnProperty("name");
  });

  const sortedData = [...definedData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  console.log("sortedData:", sortedData);

  return (
    <table>
      <colgroup>
        <col style={{ width: `${columnWidths[0]}px` }} />
        <col style={{ width: `${columnWidths[1]}px` }} />
        <col style={{ width: `${columnWidths[2]}px` }} />
        <col style={{ width: `${columnWidths[3]}px` }} />
        <col style={{ width: `${columnWidths[4]}px` }} />
      </colgroup>
      <TableHeader
        handleSort={handleSort}
        sortConfig={sortConfig}
        columnWidths={columnWidths}
      />
      <tbody>
        {sortedData.map((item, index) => {
          if (!item) {
            console.warn('Undefined data item found in sortedData:', item);
            item = {}; // Provide an empty object as a fallback
          }
          const tags = item.tags?.join(', ');
          const createdAt = item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : '';
          const size = item.size ? item.size.toLocaleString() : '';
          return (
            <TableRow
              key={item.name}
              file={{ ...item, tags, createdAt, size }}
              onFileClick={onFileClick}
              handleDelete={() => handleDelete(item.name)} // pass handleDelete as a prop
              columnWidths={columnWidths} // Pass columnWidths prop here
            />
          );
        })}
      </tbody>
    </table>
  );
      };

      export default FileTable;