import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Dashboard from "./Pages/Dashboard";
import Customers from "./Components/Customers/Customers";
import User from "./Components/User/User";
import Entree_Sortie from "./Components/Entree_Sortie/Entree_Sortie";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/customers" element={<Customers />} />
          <Route path="/user" element={<User />} />
          <Route path="/entree_sortie" element={<Entree_Sortie />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
