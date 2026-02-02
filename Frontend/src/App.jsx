import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editDesc, setEditDesc] = useState("");

  // Fetch all notes
  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create note
  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchNotes();
        e.target.reset();
      });
  }

  // Delete note
  function handleDeleteNote(noteId) {
    axios
      .delete("http://localhost:3000/api/notes/" + noteId)
      .then(() => fetchNotes());
  }

  // Update description
  function updateDesc(id, newDesc) {
    axios
      .patch("http://localhost:3000/api/notes/" + id, {
        description: newDesc,
      })
      .then(() => {
        fetchNotes();
        setEditId(null);
        setEditDesc("");
      });
  }

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <h2 className="logo">📝 Notes App</h2>
        <div className="nav-actions">
          <span className="nav-user">Welcome 👋</span>
          <button
            className="nav-btn"
            onClick={() =>
              document.querySelector(".note-create-form input")?.focus()
            }
          >
            New Note
          </button>
        </div>
      </nav>

      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" required />
        <input
          name="description"
          type="text"
          placeholder="Enter description"
          required
        />
        <button>Create note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>

            {/* EDIT MODE */}
            {editId === note._id ? (
              <>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button
                  className="save"
                  onClick={() => updateDesc(note._id, editDesc)}
                >
                  Save
                </button>
                <button className="cancel" onClick={() => setEditId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <p>{note.description}</p>
            )}

            <button
              className="delete"
              onClick={() => handleDeleteNote(note._id)}
            >
              Delete
            </button>

            <button
              className="edit"
              onClick={() => {
                setEditId(note._id);
                setEditDesc(note.description);
              }}
            >
              Edit Description
            </button>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>
          © 2026 Notes App • MERN Stack 🚀 (React · Node · Express · MongoDB)
        </p>

        <div className="social-links">
          <a
            href="https://github.com/deepsandilya01"
            target="_blank"
            rel="noreferrer"
            className="social github"
          >
            <i className="ri-github-fill"></i>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/deepsandilya01"
            target="_blank"
            rel="noreferrer"
            className="social linkedin"
          >
            <i className="ri-linkedin-box-fill"></i>
            <span>LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/deepsandilya_01"
            target="_blank"
            rel="noreferrer"
            className="social instagram"
          >
            <i className="ri-instagram-fill"></i>
            <span>Instagram</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
