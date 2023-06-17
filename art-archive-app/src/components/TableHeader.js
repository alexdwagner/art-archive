import React from 'react';
const TableHeader = ({ handleSort, sortConfig, columnWidths }) => {
    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return React.createElement("span", null, sortConfig.direction === 'ascending' ? '▲' : '▼');
        }
        return null;
    };
    return (React.createElement("thead", null,
        React.createElement("tr", null, ['name', 'size', 'type', 'createdAt', 'tags'].map((key) => (React.createElement("th", { key: key, onClick: () => handleSort(key), style: { width: `${columnWidths[key]}px` } },
            key.charAt(0).toUpperCase() + key.slice(1),
            renderSortIcon(key)))))));
};
export default TableHeader;
