import "./style/style.css";
import { Routes, Route, Link } from "react-router-dom";
import Interventions from "./pages/Interventions";
import AddIntervention from "./components/AddIntervention";

function App() {
  return (
    <div className="container">

      <div className="sidebar">
        <img src="/logo-tt.png" alt="Tunisie Telecom" className="logo" />
        <h2>MediTrack</h2>

        <Link to="/">Accueil</Link>
        <Link to="/interventions">Interventions</Link>
        <Link to="/techniciens">Techniciens</Link>
        <Link to="/pannes">Pannes</Link>
        <Link to="/add">Ajouter</Link>
      </div>

      <div className="main">
        <Routes>
          <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/interventions" element={<Interventions />} />
          <Route path="/techniciens" element={<h2>Techniciens</h2>} />
          <Route path="/pannes" element={<h2>Pannes</h2>} />
          <Route path="/add" element={<AddIntervention />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;