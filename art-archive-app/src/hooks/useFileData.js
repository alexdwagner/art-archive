import { useState, useMemo } from "react";

const useFileData = (initialData) => {
  const [items, setItems] = useState(initialData);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  const sortedItems = useMemo(() => {
    if (!sortConfig) {
      return items;
    }

    const sortableItems = [...items].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  }, [items, sortConfig]);

  const toggleSelect = (itemId, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const toggleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const deleteSelectedItems = () => {
    const newItems = items.filter((item) => !selectedItems.includes(item.id));
    setItems(newItems);
    setSelectedItems([]);
    return newItems;
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return {
    items: sortedItems,
    sortConfig,
    requestSort,
    toggleSelect,
    toggleSelectAll,
    selectedItems,
    deleteSelectedItems,
    setData: setItems,
  };
};

export default useFileData;
