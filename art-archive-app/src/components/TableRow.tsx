import React, { useState } from "react";
import { formatBytes } from "../utils";
import Tags from "./Tags";
import ErrorBoundary from './ErrorBoundary';

const TableRow = ({ 
  file, 
  onFileClick, 
  onDeleteClick, 
  onUpdate, 
  checkedItems, 
  setCheckedItems 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate({ ...file, name: newName });
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleTagsUpdate = (newTags) => {
    onUpdate(file.id, newTags);
  };

  const handleCheckboxChange = (event) => {
    setCheckedItems({ ...checkedItems, [file.id]: event.target.checked });
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id={`select-${file.id}`}
          checked={!!checkedItems[file.id]} // If the item ID exists in the state, mark it as checked
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        {isEditing ? (
          <>
            <input type="text" value={newName} onChange={handleChange} />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <span onClick={() => onFileClick(file)}>{file.name}</span>
            <button onClick={handleEdit}>Edit</button>
          </>
        )}
      </td>
      <td>{formatBytes(file.size)}</td>
      <td>{file.type}</td>
      <td>{file.createdAt}</td>
      <td>
        <ErrorBoundary>
          <Tags tags={file.tags} fileId={file.id} onUpdate={handleTagsUpdate} />
        </ErrorBoundary>
      </td>
      <td>
        <button onClick={() => onDeleteClick(file)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
