import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import '../styles/Tags.css';

interface TagsProps {
  tags?: string[];
  fileId: string; // Modify to match actual type of fileId
  onUpdate: (fileId: string, tags: { tags: string[] }) => void; // Modify to match actual onUpdate function
}

const Tags = ({ tags = [], fileId, onUpdate }: TagsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSuggesting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSuggesting]);

  const handleInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTag(e.currentTarget.value);
      return;
    }

    if (e.currentTarget.value && tags) {
      const matchingSuggestions = tags.filter((tag) =>
        tag.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())
      );
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddTag = (newTag: string) => {
    setInputValue("");
    setSuggestions([]);
    setIsSuggesting(false);
    const newTags = [...tags, newTag];
    onUpdate(fileId, { tags: newTags });
  };

  const handleSuggestionClick = (suggestedTag: string) => {
    handleAddTag(suggestedTag);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onUpdate(fileId, { tags: newTags });
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
