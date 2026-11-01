import React, { useEffect, useState } from "react";
import axios from "axios";

function Interventions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/interventions")
      .then(res => {
        console.log(res.data);

        // مهم 🔥
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Liste des Interventions</h2>

      {data.length === 0 ? (
        <p>ما فما حتى intervention</p>
      ) : (
        <ul>
          {data.map(i => (
            <li key={i.id}>
              {i.title} - {i.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Interventions;