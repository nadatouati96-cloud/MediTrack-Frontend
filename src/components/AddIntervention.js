import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddIntervention() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "",
    date_intervention: "",
    technicien_id: ""
  });

  const [techniciens, setTechniciens] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // 🟢 fetch techniciens
  useEffect(() => {
    fetch("http://localhost:3001/techniciens")
      .then(res => res.json())
      .then(data => setTechniciens(data));
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/interventions/${id}`)
        .then(res => res.json())
        .then(data => setForm(data[0]));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      // UPDATE
      fetch(`http://localhost:3001/interventions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then(() => navigate("/interventions"));

    } else {
      // ADD
      fetch("http://localhost:3001/interventions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }).then(() => navigate("/interventions"));
    }
  };

  return (
    <div>
      <h2>{id ? "Modifier" : "Ajouter"} Intervention</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        /><br /><br />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={form.status}
          onChange={handleChange}
        /><br /><br />

        <input
          type="date"
          name="date_intervention"
          value={form.date_intervention}
          onChange={handleChange}
        /><br /><br />

        {/* 🆕 select technicien */}
        <select
          name="technicien_id"
          value={form.technicien_id}
          onChange={handleChange}
        >
          <option value="">Choisir technicien</option>
          {techniciens.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.nom}
            </option>
          ))}
        </select><br /><br />

        <button type="submit">
          {id ? "Update" : "Ajouter"}
        </button>
      </form>
    </div>
  );
}

export default AddIntervention;