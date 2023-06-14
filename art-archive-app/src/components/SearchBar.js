"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../styles/SearchBar.css");
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return className = "search-bar" >
        type;
    "text";
    placeholder = "Search files...";
    value = { searchQuery };
    onChange = { handleChange }
        /  >
        /div>;
};
;
;
exports.default = SearchBar;
