import React, { ChangeEvent, SetStateAction, Dispatch, useState } from "react";
import { formatBytes } from "../utils";
import Tags from "./Tags";
import ErrorBoundary from './ErrorBoundary';
import { MyFile } from './types';

interface TableRowProps {
  file: MyFile;
  onFileClick: (file: MyFile) => void;
  onDeleteClick: (file: MyFile) => void;
  onUpdate: (fileId: number, data: Partial<MyFile>) => void;
  checkedItems: { [key: string]: boolean };
  setCheckedItems: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

const TableRow: React.FC<TableRowProps> = ({
  file,
  onFileClick,
  onDeleteClick,
  onUpdate,
  checkedItems,
  setCheckedItems,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate(file.id, { name: newName, tags: file.tags });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleTagsUpdate = (fileId: string, data: { tags: string[] }) => {
    onUpdate(Number(fileId), data);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedItems({ ...checkedItems, [file.id]: event.target.checked });
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id={`select-${file.id}`}
          checked={!!checkedItems[file.id]} 
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
      <td>{file.createdAt.toLocaleString()}</td>
      <td>
        <ErrorBoundary>
          <Tags tags={file.tags} fileId={file.id.toString()} onUpdate={handleTagsUpdate} />
        </ErrorBoundary>
      </td>
      <td>
        <button onClick={() => onDeleteClick(file)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
