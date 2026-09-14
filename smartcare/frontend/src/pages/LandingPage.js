import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="hero">
      <h1>Welcome to SmartCare</h1>
      <p>Your healthcare management system — book appointments, track your place in the queue, and stay informed, all in one place.</p>
      <div className="hero-actions">
        <Link to="/login" className="btn btn-outline">Login</Link>
        <Link to="/register" className="btn btn-primary">Register</Link>
      </div>
    </div>
  );
}
