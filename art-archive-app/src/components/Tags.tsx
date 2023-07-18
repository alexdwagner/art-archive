import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import '../styles/Tags.css';
import { Tag } from '../types';

interface TagsProps {
  tags?: Tag[];
  fileId: string; // Modify to match actual type of fileId
  onUpdate: (fileId: string, data: { tags: Tag[] }) => void; // Modify to match actual onUpdate function
}

let ID_COUNTER = 0;

const generateUniqueNumber = () => {
  ID_COUNTER += 1;
  return ID_COUNTER;
};

const Tags = ({ tags = [], fileId, onUpdate }: TagsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
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
      handleAddTag({ id: generateUniqueNumber(), name: e.currentTarget.value }); // replace generateUniqueNumber() with a function that generates a unique ID
      return;
    }

    if (e.currentTarget.value && tags) {
      const matchingSuggestions = tags.filter((tag) =>
        tag.name.toLowerCase().startsWith(e.currentTarget.value.toLowerCase())
      );
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddTag = (newTag: Tag) => {
    setInputValue("");
    setSuggestions([]);
    setIsSuggesting(false);
    const newTags = [...tags, newTag];
    onUpdate(fileId, { tags: newTags });
  };

  const handleSuggestionClick = (suggestedTag: Tag) => {
    handleAddTag(suggestedTag);
  };

  const handleRemoveTag = (tagToRemove: Tag) => {
    const newTags = tags.filter((tag) => tag.id !== tagToRemove.id);
    onUpdate(fileId, { tags: newTags });
  };

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <div key={`tag-${index}`} className="tag">
          <span className="tag-name">{tag.name}</span>
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
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 

export default Tags;
