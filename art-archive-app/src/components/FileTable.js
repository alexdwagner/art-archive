import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const FileTable = ({ data, onFileClick, columnWidths }) => {
  console.log('data:', data);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: '' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Display a message when no files are available
  if (!data || data.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

  // Filter out undefined data items and items without a name property
  const definedData = data.filter((item) => {
    if (!item) {
      console.warn('Undefined data item found:', item);
      return false;
    }
    return item.hasOwnProperty('name');
  });

  // Sort data based on sortConfig
  const sortedData = [...definedData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  console.log('sortedData:', sortedData);

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
        {sortedData.map((item, index) => {
          if (!item) {
            console.warn('Undefined data item found in sortedData:', item);
            item = {}; // Provide an empty object as a fallback
          }
          const tags = item.tags?.join(', ');
          const createdAt = item.createdAt
            ? new Date(item.createdAt).toLocaleString()
            : '';
          const size = item.size ? item.size.toLocaleString() : '';
          return (
            <TableRow
              key={item.name}
              file={{ ...item, tags, createdAt, size }}
              onFileClick={onFileClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default FileTable;
