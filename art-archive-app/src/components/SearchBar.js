import React from "react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
