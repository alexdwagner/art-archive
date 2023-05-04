import React from "react";

const TableActions = ({ selectedFiles = [], handleDelete }) => {
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
