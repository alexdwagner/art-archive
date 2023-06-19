import React, { useState, ChangeEvent } from "react";

interface EditableCellProps {
  value: string; 
  onUpdate: (newValue: string) => void; 
}

const EditableCell = ({ value, onUpdate }: EditableCellProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(newValue);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
