import { useState, useCallback } from 'react';

const useSelectableData = (items) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectAll = useCallback(() => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items);
    }
  }, [items, selectedItems.length]);

  const toggleSelect = useCallback((item) => {
    setSelectedItems((selectedItems) => {
      const index = selectedItems.indexOf(item);
      if (index > -1) {
        return selectedItems.filter((selectedItem) => selectedItem !== item);
      }
      return [...selectedItems, item];
    });
  }, []);

  return { selectedItems, toggleSelectAll, toggleSelect };
};

export { useSelectableData };
