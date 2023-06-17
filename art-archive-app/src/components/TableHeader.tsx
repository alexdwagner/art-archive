import React from 'react';

interface SortConfig {
  key: string;
  direction: 'ascending' | 'descending';
}

interface TableHeaderProps {
  handleSort: (key: string) => void;
  sortConfig: SortConfig;
  columnWidths: Record<string, number>;
}

const TableHeader: React.FC<TableHeaderProps> = ({ handleSort, sortConfig, columnWidths }) => {
  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>;
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {['name', 'size', 'type', 'createdAt', 'tags'].map((key) => (
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
