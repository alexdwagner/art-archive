"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableHeader = ({ handleSort, sortConfig, columnWidths }) => {
    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return { sortConfig, : .direction === 'ascending' ? '▲' : '▼' } < /span>;;
        }
        return null;
    };
    return { ['name', 'size', 'type', 'createdAt', 'tags']: .map((key, index) => key = { key }, onClick = {}()) };
};
handleSort(key);
style = {};
{
    width: `${columnWidths[key]}px`;
}
    >
        { key, : .charAt(0).toUpperCase() + key.slice(1) };
{
    renderSortIcon(key);
}
/th>;
/tr>
    < /thead>;
;
;
exports.default = TableHeader;
