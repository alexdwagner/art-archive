import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableActions from "./TableActions";
import { useSortableData } from "../hooks/useSortableData";
import { useSelectableData } from "../hooks/useSelectableData";
import { useDeletableData } from "../hooks/useDeletableData";

const FileTable = ({ data, onFileClick, columnWidths }) => {
  const { items: sortedData, requestSort: handleSort, sortConfig } = useSortableData(data);
  const { selectedItems: selectableData, toggleSelectAll, toggleSelect } = useSelectableData(sortedData);
  const { deleteSelectedItems: handleDelete } = useDeletableData(selectableData);

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
  selectedFiles={selectableData}
  onDelete={handleDelete}
/>

    </table>
  );
};

export default FileTable;
