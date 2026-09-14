import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // clear context
    navigate("/login"); // cleaner redirect
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-brand-icon" aria-hidden="true">+</span>
        SmartCare
      </Link>

      <div className="navbar-links">
        {user?.role === "ADMIN" && (
          <>
            <Link to="/dashboard" className="nav-link">Admin Dashboard</Link>
            <Link to="/patients" className="nav-link">Patients</Link>
            <Link to="/staff" className="nav-link">Staff</Link>
          </>
        )}

        {["DOCTOR", "NURSE", "RECEPTIONIST"].includes(user?.role) && (
          <Link to="/staff" className="nav-link">Staff Dashboard</Link>
        )}

        {user?.role === "PATIENT" && (
          <Link to="/appointments" className="nav-link">Book Appointment</Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="btn btn-outline">Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
