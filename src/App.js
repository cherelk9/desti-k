//import AddEmployer from "./administration/AddEmployer"
import Connexion  from "./connexion/Connexion";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Accueil from "./accueil/Accueil";
import Client  from "./accueil/Client";
import Caisse from "./caisse/Caisse";
import Footer from "./utilis/Footer";
import AdminDashboard from "./administration/Admin";
import CustomerById from "./administration/components/CustomerById";




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
                  <Route path="/single_customer/:id" element={<CustomerById/>}/>
              </Routes>
          </Router>

        {/** <Footer />*/}

          {/**<AddEmployer/> **/}
      </div>);
}

export default App;
