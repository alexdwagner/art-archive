"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const SearchBar_1 = __importDefault(require("./SearchBar"));
const FileTable_1 = __importDefault(require("./FileTable"));
const API_URL = "http://localhost:3001";
const Main = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)("");
    const onRefreshButtonClick = () => {
        fetchData();
    };
    // This useEffect will log the selectedFile state whenever it changes
    (0, react_1.useEffect)(() => {
        console.log('selectedFile:', selectedFile);
    }, [selectedFile]);
    // This function fetches data from the uploads endpoint of your API.
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/uploads/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Fetched data:", data);
            setData(Array.isArray(data) ? data : []);
        }
        catch (error) {
            console.error("Error fetching file list:", error);
            setData([]);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    // This function fetches a blob from a specific URL. 
    const fetchFileBlob = (url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return yield response.blob();
        }
        catch (error) {
            console.error("Error fetching file blob:", error);
        }
    });
    // This function updates a file with new tags
    // This function updates a file with new tags
    const onUpdate = (id, newTags) => __awaiter(void 0, void 0, void 0, function* () {
        const originalFile = data.find((file) => file.id === id);
        if (!originalFile) {
            console.error("File not found:", id);
            return;
        }
        const updatedFile = Object.assign(Object.assign({}, originalFile), { tags: newTags });
        try {
            const response = yield fetch(`${API_URL}/api/uploads/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFile),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setData((prevData) => prevData.map((item) => (item.id === id ? updatedFile : item)));
        }
        catch (error) {
            console.error("Error updating file:", error);
        }
    });
    // This function deletes a file
    // This function deletes a file
    const onDeleteClick = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${API_URL}/api/uploads/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            setData((prevData) => prevData.filter((item) => item.id !== id));
        }
        catch (error) {
            console.error("Error deleting file:", error);
        }
    });
    return className = "main" >
        { selectedFile } && selectedFile.type.startsWith("audio/") ? file = { selectedFile } /  >
        :
    ;
};
file = { selectedFile } /  >
;
className;
"form-and-table" >
    updateData;
{
    fetchData;
}
/>
    < SearchBar_1.default;
searchQuery = { searchQuery };
setSearchQuery = { setSearchQuery } /  >
    { /* Refresh button */}
    < button;
onClick = { onRefreshButtonClick } > Refresh < /button>
    < FileTable_1.default;
data = { data, : .filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (file.tags && file.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))) };
onFileClick = { async(file) { } };
{
    try {
        const blob = await fetchFileBlob(file.url);
        setSelectedFile(new File([blob], file.name, { type: blob.type }));
    }
    catch (error) {
        console.error("Error fetching file blob:", error);
    }
}
onUpdate = { onUpdate };
onDeleteClick = { onDeleteClick }
    /  >
    /div>
    < /main>;
;
exports.default = Main;
