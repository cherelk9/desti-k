
import Connexion  from "./connexion/Connexion";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Accueil from "./accueil/Accueil";
import Client  from "./accueil/Client";
import Caisse from "./caisse/Caisse";
import AdminDashboard from "./administration/Admin";




function App() {
  return (
      <div className="p-6">
          <Router>
              <Routes>
                  <Route path="/" element={<Connexion />} />
                  <Route path="/accueil" element={<Accueil />} />
                  <Route path="addClient" element={<Client />} />
                  <Route path="/caisse" element={<Caisse />} />
                  <Route path="/admin" element={<AdminDashboard></AdminDashboard>} />

              </Routes>
          </Router>

      </div>);
}

export default App;
