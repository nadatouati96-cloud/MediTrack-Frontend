import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Techniciens() {
  const [techniciens, setTechniciens] = useState([]);
  const [nom, setNom] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTechniciens = () => {
    axios.get("http://localhost:5000/techniciens")
      .then(res => setTechniciens(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTechniciens();
  }, []);

  // ADD or UPDATE
  const handleSubmit = () => {
    if (!nom || !specialite) {
      alert("Remplir tous les champs !");
      return;
    }

    if (editId) {
      // UPDATE
      axios.put(`http://localhost:5000/techniciens/${editId}`, {
        nom,
        specialite
      }).then(() => {
        setEditId(null);
        setNom("");
        setSpecialite("");
        fetchTechniciens();
      });
    } else {
      // ADD
      axios.post("http://localhost:5000/techniciens", {
        nom,
        specialite
      }).then(() => {
        setNom("");
        setSpecialite("");
        fetchTechniciens();
      });
    }
  };

  // DELETE
  const deleteTechnicien = (id) => {
    axios.delete(`http://localhost:5000/techniciens/${id}`)
      .then(() => fetchTechniciens());
  };

  // EDIT (remplir form)
  const editTechnicien = (t) => {
    setNom(t.nom);
    setSpecialite(t.specialite);
    setEditId(t.id);
  };

  return (
    <div style={styles.container}>
      <h2>👨‍🔧 Gestion des Techniciens</h2>

      {/* FORM */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Spécialité"
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
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
            <th>Nom</th>
            <th>Spécialité</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {techniciens.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.nom}</td>
              <td>{t.specialite}</td>
              <td>
                <button onClick={() => editTechnicien(t)}>
                  Modifier
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTechnicien(t.id)}
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