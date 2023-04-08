import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const FileTable = ({ files, onFileClick, columnWidths }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Display a message when no files are available
  if (!files || files.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

  // Filter out undefined files
  const definedFiles = files.filter((file) => file !== undefined);

  // Sort files based on sortConfig
  const sortedFiles = [...definedFiles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

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
        {sortedFiles.length > 0 &&
          sortedFiles.map((file, index) => {
            if (!file || !file.name) {
              console.error(
                `File at index ${index} is missing a name property`,
                file
              );
              return null;
            }
            const tags = file.tags && file.tags.join(', ');
            const createdAt = new Date(file.createdAt).toLocaleString();
            const size = file.size ? file.size.toLocaleString() : '';
            return (
              <TableRow
                key={file.name}
                file={{ ...file, tags, createdAt, size }} // spread in the updated properties
                onFileClick={onFileClick}
              />
            );
          })}
      </tbody>
    </table>
  );
};

export default FileTable;
