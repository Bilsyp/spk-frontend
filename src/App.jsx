import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // buat dummy dulu
import Register from "./pages/Register";
import Absensi from "./pages/Absensi";
// ...

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/absensi" element={<Absensi />} />
      </Routes>
    </Router>
  );
}
