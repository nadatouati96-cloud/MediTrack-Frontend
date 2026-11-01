import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Pannes() {
  const [pannes, setPannes] = useState([]);
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchPannes = () => {
    axios.get("http://localhost:5000/pannes")
      .then(res => setPannes(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPannes();
  }, []);

  // ADD / UPDATE
  const handleSubmit = () => {
    if (!description) {
      alert("Ajouter description !");
      return;
    }

    if (editId) {
      // UPDATE
      axios.put(`http://localhost:5000/pannes/${editId}`, {
        description
      }).then(() => {
        setEditId(null);
        setDescription("");
        fetchPannes();
      });
    } else {
      // ADD
      axios.post("http://localhost:5000/pannes", {
        description
      }).then(() => {
        setDescription("");
        fetchPannes();
      });
    }
  };

  // DELETE
  const deletePanne = (id) => {
    axios.delete(`http://localhost:5000/pannes/${id}`)
      .then(() => fetchPannes());
  };

  // EDIT
  const editPanne = (p) => {
    setDescription(p.description);
    setEditId(p.id);
  };

  return (
    <div style={styles.container}>
      <h2>⚠️ Gestion des Pannes</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update" : "Ajouter"}
        </button>
      </div>

      {/* TABLE */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pannes.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => editPanne(p)}>
                  Modifier
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deletePanne(p.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 🎨 STYLE
const styles = {
  container: { padding: "30px" },

  form: {
    marginBottom: "20px",
    display: "flex",
    gap: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginLeft: "5px",
    cursor: "pointer"
  }
};