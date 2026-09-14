import { useEffect, useState } from "react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

function priorityBadgeClass(priority) {
  if (priority === "HIGH") return "badge badge-high";
  if (priority === "MEDIUM") return "badge badge-medium";
  return "badge badge-standard";
}

export default function StaffDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, queueRes] = await Promise.all([
          API.get("/appointments"),
          API.get("/queue"),
        ]);
        setAppointments(appointmentsRes.data);
        setQueue(queueRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch staff dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Staff Dashboard</h2>
        <p className="page-subtitle">Today's appointments and the live patient queue.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <h3>Appointments</h3>
        {appointments.length === 0 ? (
          <p className="empty-state">No appointments found.</p>
        ) : (
          <ul className="list-reset">
            {appointments.map((a) => (
              <li key={a.id || a.appointment_id} className="list-item">
                <span>Dept: {a.department_id} · {a.appointment_date} at {a.appointment_time}</span>
                <span className={priorityBadgeClass(a.priority_level)}>{a.priority_level}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Queue</h3>
        {queue.length === 0 ? (
          <p className="empty-state">Queue is empty.</p>
        ) : (
          <ul className="list-reset">
            {queue.map((q) => (
              <li key={q.id || q.queue_number} className="list-item">
                <span>Queue #{q.queue_number} · Appointment: {q.appointment_id}</span>
                <span className="page-subtitle">Score: {q.priority_score} · {q.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
