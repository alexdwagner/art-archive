import React from "react";
import TableRow from "./TableRow";


const FileTable = ({
  data = [], // Add a default value for data
  onFileClick,
  onDeleteClick,
  onUpdate,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
          <th>Created</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
  {data.map((file) => (
    <TableRow
      key={file.id}
      file={file}
      onFileClick={onFileClick}
      onDeleteClick={onDeleteClick}
      onUpdate={onUpdate}
    />
  ))}
</tbody>

    </table>
  );
};

export default FileTable;
