"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileTable = ({ data = [], // Add a default value for data
onFileClick, onDeleteClick, onUpdate, }) => {
    return (Name < /th>
        < th > Size < /th>
        < th > Type < /th>
        < th > Created < /th>
        < th > Tags < /th>
        < th > Actions < /th>
        < /tr>
        < (/thead>));
    {
        data.map((file) => key = { file, : .id }, file = { file }, onFileClick = { onFileClick }, onDeleteClick = { onDeleteClick }, onUpdate = { onUpdate }
            /  >
        );
    }
    /tbody>
        < /table>;
};
;
;
exports.default = FileTable;
