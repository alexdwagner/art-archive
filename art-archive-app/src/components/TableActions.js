import React from "react";
const TableActions = ({ selectedFiles = [], handleDelete }) => {
    return (React.createElement("div", { className: "table-actions" },
        selectedFiles.length > 0 && (React.createElement("div", { className: "selected-files" },
            React.createElement("p", null,
                "Selected files: ",
                selectedFiles.length),
            React.createElement("button", { onClick: () => handleDelete(selectedFiles) }, "Delete"))),
        React.createElement("div", { className: "checkbox-container" },
            React.createElement("input", { type: "checkbox", id: "select-all" }),
            React.createElement("label", { htmlFor: "select-all" }, "Select all"))));
};
export default TableActions;
