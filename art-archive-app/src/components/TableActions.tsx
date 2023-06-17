import React from "react";

interface TableActionsProps {
  selectedFiles?: any[];
  handleDelete: (selectedFiles: any[]) => void;
}

const TableActions: React.FC<TableActionsProps> = ({ selectedFiles = [], handleDelete }) => {
  return (
    <div className="table-actions">
      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <p>Selected files: {selectedFiles.length}</p>
          <button onClick={() => handleDelete(selectedFiles)}>Delete</button>
        </div>
      )}
      <div className="checkbox-container">
        <input type="checkbox" id="select-all" />
        <label htmlFor="select-all">Select all</label>
      </div>
    </div>
  );
};

export default TableActions;
