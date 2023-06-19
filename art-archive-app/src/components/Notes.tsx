import React, { useState, useEffect, FormEvent } from "react";
import "../styles/Notes.css";
import { MyFile } from './types';

interface Note {
  noteText: string;
  timestamp: string;
}

interface Props {
  file: MyFile;
}

const Notes = ({ file }: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (file) {
      const storedNotes = localStorage.getItem(file.name);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        setNotes([]);
      }
    }
  }, [file]);

  useEffect(() => {
    if (file && notes.length > 0) {
      localStorage.setItem(file.name, JSON.stringify(notes));
    }
  }, [file, notes]);

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const noteText = (event.currentTarget.elements.namedItem('text') as HTMLInputElement)?.value.trim();
    if (noteText) {
      const timestamp = new Date().toLocaleString();
      setNotes((prevNotes) => [...prevNotes, { noteText, timestamp }]);
      event.currentTarget.reset();
    }
  };

  return (
    <div className="notes">
      <h3>Notes</h3>
      <form onSubmit={addNote}>
        <textarea
          name="text"
          placeholder="Enter your note here..."
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <p>{note.noteText}</p>
            <span>{note.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
