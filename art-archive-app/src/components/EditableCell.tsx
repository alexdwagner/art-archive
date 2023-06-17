import React, { useState } from "react";

const EditableCell = ({ value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(newValue);
  };

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <td>
      {isEditing ? (
        <>
          <input type="text" value={newValue} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{value}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </td>
  );
};

export default EditableCell;
