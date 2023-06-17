import { useState, useEffect } from "react";
import "../styles/Notes.css";
const Notes = ({ file }) => {
    const [notes, setNotes] = useState([]);
    // Load the notes from the local storage when the file changes
    useEffect(() => {
        if (file) {
            const storedNotes = localStorage.getItem(file.name);
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            }
            else {
                setNotes([]);
            }
        }
    }, [file]);
    // Save the notes to the local storage when they change
    useEffect(() => {
        if (file && notes.length > 0) {
            localStorage.setItem(file.name, JSON.stringify(notes));
        }
    }, [file, notes]);
    // Handle the form submission and update the state with the new note
    const addNote = (event) => {
        event.preventDefault();
        const noteText = event.target.elements.text.value.trim();
        if (noteText) {
            const timestamp = new Date().toLocaleString();
            setNotes((prevNotes) => [...prevNotes, { noteText, timestamp }]);
            event.target.reset();
        }
    };
    return className = "notes" >
        Notes < /h3>
        < form;
    onSubmit = { addNote } >
        name;
    "text";
    placeholder = "Enter your note here...";
    required
        /  >
        type;
    "submit" > Submit < /button>
        < (/form>);
    {
        notes.map((note, index) => key = { index } >
            { note, : .noteText } < /p>
            < span > { note, : .timestamp } < /span>
            < /li>);
    }
    /ul>
        < /div>;
};
;
;
export default Notes;
