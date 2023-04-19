import React from 'react';

const HeaderCell = ({ keyName, handleSort, sortConfig, columnWidths }) => {
  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return <span>{sortConfig.direction === 'ascending' ? '▲' : '▼'}</span>;
    }
    return null;
  };

  return (
    <th
      key={keyName}
      onClick={() => handleSort(keyName)}
      style={{ width: `${columnWidths[keyName]}px` }}
    >
      {keyName.charAt(0).toUpperCase() + keyName.slice(1)}
      {renderSortIcon(keyName)}
    </th>
  );
};

export default HeaderCell;
