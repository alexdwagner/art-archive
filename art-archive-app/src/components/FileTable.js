import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const FileTable = ({ data, onFileClick, columnWidths }) => { // Changed 'files' to 'data'
  console.log('files:', data);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };
  

  // Display a message when no files are available
  if (!data || data.length === 0) { // Changed 'files' to 'data'
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

// Filter out undefined files and files without a name property
const definedFiles = data.filter((file) => { // Changed 'files' to 'data'
  if (!file) {
    console.warn('Undefined file object found:', file);
    return false;
  }
  return file.hasOwnProperty('name');
});

  // Sort files based on sortConfig
  const sortedFiles = [...definedFiles].sort((a, b) => {
    const key = sortConfig.key ?? "name";
    if (a[key] < b[key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
  

  console.log('sortedFiles:', sortedFiles);

  return (
    <table>
      <colgroup>
        <col style={{ width: `${columnWidths.name}px` }} />
        <col style={{ width: `${columnWidths.type}px` }} />
        <col style={{ width: `${columnWidths.size}px` }} />
        <col style={{ width: `${columnWidths.createdAt}px` }} />
        <col style={{ width: `${columnWidths.tags}px` }} />
      </colgroup>
      <TableHeader
        handleSort={handleSort}
        sortConfig={sortConfig}
        columnWidths={columnWidths}
      />
      <tbody>
      {sortedFiles.map((file, index) => {
          if (!file) {
            console.warn('Undefined file object found in sortedFiles:', file);
            file = {}; // Provide an empty object as a fallback
          }
          const tags = file.tags?.join(', ');
          const createdAt = file.createdAt
            ? new Date(file.createdAt).toLocaleString()
            : '';
          const size = file.size ? file.size.toLocaleString() : '';
          return (
            <TableRow key={file.name} file={{ ...file, tags, createdAt, size }} onFileClick={onFileClick} />
          );
        })}
      </tbody>
    </table>
  );
};

export default FileTable;
