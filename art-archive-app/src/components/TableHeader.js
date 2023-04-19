import React from 'react';
import HeaderCell from './HeaderCell';

const TableHeader = ({ handleSort, sortConfig, columnWidths }) => {
  const headerKeys = ['name', 'type', 'size', 'createdAt', 'tags'];

  return (
    <thead>
      <tr>
        {headerKeys.map((key) => (
          <HeaderCell
            key={key}
            keyName={key}
            handleSort={handleSort}
            sortConfig={sortConfig}
            columnWidths={columnWidths}
          />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
