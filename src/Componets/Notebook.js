import React, { useState, useEffect } from "react";

function Notebook() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever the notes array changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const addNote = () => {
    if (note.trim()) {
      if (isEditing) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = note;
        setNotes(updatedNotes);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        setNotes([...notes, note]);
      }
      setNote("");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const editNote = (index) => {
    setNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="container" style={{ padding: "20px", marginTop: "50px" }}>
      <h2>React Notebook</h2>

      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={note}
          onChange={handleNoteChange}
          rows="4"
          placeholder="Write your note here..."
          style={{ width: "100%", padding: "10px" }}
        />
      </div>

      <button
        onClick={addNote}
        style={{
          padding: "10px 20px",
          backgroundColor: isEditing ? "#28a745" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isEditing ? "Save Edit" : "Add Note"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Your Notes:</h3>
        {notes.length > 0 ? (
          notes.map((n, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                position: "relative",
              }}
            >
              {n}
              <button
                onClick={() => deleteNote(index)}
                style={{
                  position: "absolute",
                  right: "60px",
                  top: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => editNote(index)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <p>No notes yet!</p>
        )}
      </div>
    </div>
  );
}

export default Notebook;
