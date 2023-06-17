import "../styles/SearchBar.css";
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
export default SearchBar;
