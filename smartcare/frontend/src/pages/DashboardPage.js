import { useEffect, useState } from "react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DashboardPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/patients");
        setPatients(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <p className="page-subtitle">Overview of registered patients.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        {patients.length === 0 ? (
          <p className="empty-state">No patients found.</p>
        ) : (
          <ul className="list-reset">
            {patients.map((p) => (
              <li key={p.id || p.patient_id} className="list-item">
                <span>{p.first_name} {p.last_name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
