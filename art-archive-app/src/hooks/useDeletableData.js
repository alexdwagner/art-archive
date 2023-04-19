import { useCallback } from 'react';

const useDeletableData = (items, onDelete) => {
  const deleteSelectedItems = useCallback(() => {
    onDelete(items);
  }, [items, onDelete]);

  return { deleteSelectedItems };
};

export { useDeletableData };
