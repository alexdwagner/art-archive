import React, { useState, useRef, useEffect } from "react";
import '../styles/Tags.css';

const Tags = ({ tags = [], onUpdate }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSuggesting) {
      inputRef.current.focus();
    }
  }, [isSuggesting]);

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      handleAddTag(e.target.value);
      return;
    }

    if (e.target.value) {
      const matchingSuggestions = tags.filter((tag) =>
        tag.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddTag = (newTag) => {
    setInputValue("");
    setSuggestions([]);
    setIsSuggesting(false);
    onUpdate([...tags, newTag]);
  };

  const handleSuggestionClick = (suggestedTag) => {
    handleAddTag(suggestedTag);
  };

  const handleRemoveTag = (tagToRemove) => {
    onUpdate(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <div key={`tag-${index}`} className="tag">
          <span className="tag-name">{tag}</span>
          <span
            className="remove-tag"
            onClick={() => handleRemoveTag(tag)}
          >
            &times;
          </span>
        </div>
      ))}
      {isSuggesting ? (
        <input
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={handleInputValueChange}
          onKeyDown={handleInputChange}
          onBlur={() => setIsSuggesting(false)}
        />
      ) : (
        <button onClick={() => setIsSuggesting(true)}>+</button>
      )}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div
              key={`suggestion-${index}`}
              className="suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default Tags;
