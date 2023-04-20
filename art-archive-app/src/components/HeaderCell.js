import React from 'react';

const HeaderCell = ({ keyName, handleSort, sortConfig, columnWidths }) => {
  const renderSortIcon = (column) => {
    if (!sortConfig || column.key !== sortConfig.key) {
      return;
    }
    return sortConfig.direction === "ascending" ? (
      <i className="fas fa-sort-up"></i>
    ) : (
      <i className="fas fa-sort-down"></i>
    );
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
