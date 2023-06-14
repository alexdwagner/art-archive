import React from 'react';

const TableHeader = ({ handleSort, sortConfig, columnWidths }) => {
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>;
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {['name', 'size', 'type', 'createdAt', 'tags'].map((key, index) => (
          <th
            key={key}
            onClick={() => handleSort(key)}
            style={{ width: `${columnWidths[key]}px` }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {renderSortIcon(key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
