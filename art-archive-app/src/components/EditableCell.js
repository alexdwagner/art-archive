"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const EditableCell = ({ value, onUpdate }) => {
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const [newValue, setNewValue] = (0, react_1.useState)(value);
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleSave = () => {
        setIsEditing(false);
        onUpdate(newValue);
    };
    const handleChange = (e) => {
        setNewValue(e.target.value);
    };
    return ({} >
        type) = "text";
    value = { newValue };
    onChange = { handleChange } /  >
        onClick;
    {
        handleSave;
    }
     > Save < /button>
        < />;
};
({ value } < /span>
    < button);
onClick = { handleEdit } > Edit < /button>
    < />;
/td>;
;
;
exports.default = EditableCell;
