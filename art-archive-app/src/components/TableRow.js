import React, { useState } from "react";
import { formatBytes } from "../utils";
import Tags from "./Tags";

const TableRow = ({ file, onFileClick, onDeleteClick, onUpdate }) => {
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
    onUpdate({ ...file, tags: newTags });
  };

  return (
    <tr>
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
        <Tags tags={file.tags} onUpdate={handleTagsUpdate} />
      </td>
      <td>
        <button onClick={() => onDeleteClick(file)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
