import React, { useState } from "react";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function TableRow({ file, onFileClick, onDeleteClick, columnWidths }) {
  const [isFileCardOpen, setIsFileCardOpen] = useState(false);

  const openFileCard = () => {
    setIsFileCardOpen(true);
  };

  const closeFileCard = () => {
    setIsFileCardOpen(false);
  };

  const isImage = (fileType) => {
    return fileType && fileType.startsWith("image/");
  };
  
  const isAudio = (fileType) => {
    return fileType && fileType.startsWith("audio/");
  };

  console.log("File:", file); // Add this line to log the file information

  return (
    <>
      <tr onDoubleClick={openFileCard}>
        <td style={{ width: `${columnWidths[0]}px` }}>{file.name}</td>
        <td style={{ width: `${columnWidths[1]}px` }}>{file.size} bytes</td>
        <td style={{ width: `${columnWidths[2]}px` }}>{file.createdAt}</td>
        <td style={{ width: `${columnWidths[3]}px` }}>{file.tags}</td>
        <td style={{ width: `${columnWidths[4]}px` }}>
          <IconButton
            aria-label="Delete file"
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="outline"
            onClick={() => onDeleteClick(file)}
          />
          {/* File card modal */}
          <Modal isOpen={isFileCardOpen} onClose={closeFileCard} size="xl">
            <ModalOverlay />
            <Center>
              <ModalContent>
                <ModalHeader>File Metadata</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>Name: {file.name}</p>
                  <p>URL: {file.url}</p>
                  <p>Size: {file.size} bytes</p>
                  <p>Type: {file.type}</p>
                  {isImage(file.type) && (
                    <Center>
                      <img src={file.url} alt={file.name} style={{ maxWidth: "100%" }} />
                    </Center>
                  )}
                  {isAudio(file.type) && (
                    <Center>
                      <audio controls src={file.url} style={{ width: "100%" }} />
                    </Center>
                  )}
                </ModalBody>
              </ModalContent>
            </Center>
          </Modal>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
