import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableActions from "./TableActions";
import useFileData from "../hooks/useFileData";

const FileTable = ({ data, onFileClick, columnWidths, onDataChange }) => {
  console.log("FileTable data:", data);
  const {
    items: sortedData,
    requestSort: handleSort,
    sortConfig,
    toggleSelect,
    toggleSelectAll,
    selectedItems,
    deleteSelectedItems,
  } = useFileData(data);

  const handleDelete = () => {
    const newItems = deleteSelectedItems();
    onDataChange(newItems);
  };

  if (!sortedData || sortedData.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

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
        {sortedData.map((item) => (
          <TableRow
            key={item.name}
            file={item}
            onFileClick={onFileClick}
            handleCheckboxChange={toggleSelect}
            columnWidths={columnWidths}
          />
        ))}
      </tbody>
      <TableActions
        selectedFiles={selectedItems}
        handleDelete={handleDelete}
        handleSelectAll={toggleSelectAll}
      />
    </table>
  );
};

export default FileTable;
