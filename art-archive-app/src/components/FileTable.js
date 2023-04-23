import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import TableActions from "./TableActions";
import { Text } from '@chakra-ui/react';


import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function FileTable({ data, onFileClick, onDeleteClick, columnWidths, onRowDoubleClick }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const openFileCard = (file) => {
    setSelectedFile(file);
  };

  const closeFileCard = () => {
    setSelectedFile(null);
  };

  if (!data || data.length === 0) {
    return (
      <div>
        <p>No files available.</p>
      </div>
    );
  }

  const definedData = data.filter((item) => {
    if (!item) {
      console.warn("Undefined data item found:", item);
      return false;
    }
    return item.hasOwnProperty("name");
  });

  const sortedData = [...definedData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <table>
        <colgroup>
          {columnWidths.map((width, index) => (
            <col key={`col-${index}`} style={{ width: `${width}px` }} />
          ))}
        </colgroup>
        <TableHeader
          handleSort={handleSort}
          sortConfig={sortConfig}
          columnWidths={columnWidths}
        />
        <tbody>
          {sortedData.map((item, index) => {
            if (!item) {
              console.warn("Undefined data item found in sortedData:", item);
              item = {}; // Provide an empty object as a fallback
            }
            const tags = item.tags?.join(", ");
            const createdAt = item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : "";
            const size = item.size ? item.size.toLocaleString() : "";
            return (
              <TableRow
                key={item.id ? `row-${item.id}` : `row-${index}`} // Use unique key based on item.id or index
                file={{ ...item, tags, createdAt, size }}
                onFileClick={onFileClick}
                onDeleteClick={onDeleteClick} // pass onDeleteClick as a prop
                columnWidths={columnWidths} // Pass columnWidths prop here
                onRowDoubleClick={() => onRowDoubleClick(item)} // Pass the selected item
                />
            );
          })}
        </tbody>
      </table>

        {/* File card modal */}
    {selectedFile && (
      <Modal isOpen onClose={closeFileCard}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>File Metadata</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Name: {selectedFile.name}</Text>
            <Text>URL: {selectedFile.url}</Text>
            <Text>Size: {selectedFile.size} bytes</Text>
            <Text>Type: {selectedFile.type}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    )}
  </>
);

    }

    export default FileTable;