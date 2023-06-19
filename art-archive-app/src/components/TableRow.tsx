import React, { ChangeEvent, MouseEventHandler, SetStateAction, Dispatch, useState } from "react";
import { formatBytes } from "../utils";
import Tags from "./Tags";
import ErrorBoundary from './ErrorBoundary';

interface File {
  id: number;
  name: string;
  size: number;
  type: string;
  createdAt: string;
  tags: string[];
  description: string;
  url: string;
  updatedAt: string;
  lastModified: string;
  webkitRelativePath: string;
}

interface TableRowProps {
  file: File;
  onFileClick: (file: File) => void;
  onDeleteClick: (file: File) => void;
  onUpdate: (fileId: number, tags: { tags: string[] }) => void;
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
    onUpdate(file, file.tags);  
  };  

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleTagsUpdate = (newTags: string[]) => {
    onUpdate(file.id, { tags: newTags });
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
