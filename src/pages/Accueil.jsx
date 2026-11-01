import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo-tt.png";

function Accueil() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <img src={logo} alt="TT" style={styles.logo} />
        <h1 style={styles.title}>MediTrack</h1>
      </div>

      <p style={styles.subtitle}>
        Application de gestion des interventions techniques
      </p>

      {/* CARDS */}
      <div style={styles.cardsContainer}>

        {/* Interventions */}
        <div
          style={styles.card}
          onClick={() => navigate("/interventions")}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <h3>📌 Interventions</h3>
          <p>Gérer toutes les interventions techniques</p>
        </div>

        {/* Techniciens */}
        <div
          style={styles.card}
          onClick={() => navigate("/techniciens")}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <h3>👨‍🔧 Techniciens</h3>
          <p>Afficher et gérer les techniciens</p>
        </div>

        {/* Pannes */}
        <div
          style={styles.card}
          onClick={() => navigate("/pannes")}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <h3>⚠️ Pannes</h3>
          <p>Suivi des problèmes et incidents</p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    background: "#f5f7fb",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px"
  },

  logo: {
    width: "70px"
  },

  title: {
    fontSize: "32px",
    color: "#2c3e50"
  },

  subtitle: {
    marginTop: "10px",
    color: "#555"
  },

  cardsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    flexWrap: "wrap"
  },

  card: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    width: "250px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default Accueil;