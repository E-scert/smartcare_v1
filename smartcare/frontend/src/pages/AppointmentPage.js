import { useState, useEffect } from "react";
import API from "../services/api";

export default function AppointmentPage() {
  const [form, setForm] = useState({
    department_id: "",
    appointment_date: "",
    appointment_time: "",
    priority_level: "NORMAL",
  });
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await API.get("/departments");
        setDepartments(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBook = async () => {
    if (
      !form.department_id ||
      !form.appointment_date ||
      !form.appointment_time
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await API.post("/appointments", form);
      setSuccess("Appointment booked successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-narrow">
      <div className="card">
        <div className="page-header">
          <h2>Book Appointment</h2>
          <p className="page-subtitle">
            Choose a department and a time that works for you.
          </p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label className="form-label" htmlFor="department_id">
            Department
          </label>
          <select
            id="department_id"
            className="form-select"
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="appointment_date">
              Date
            </label>
            <input
              id="appointment_date"
              className="form-input"
              type="date"
              name="appointment_date"
              value={form.appointment_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="appointment_time">
              Time
            </label>
            <input
              id="appointment_time"
              className="form-input"
              type="time"
              name="appointment_time"
              value={form.appointment_time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="priority_level">
            Priority
          </label>
          <select
            id="priority_level"
            className="form-select"
            name="priority_level"
            value={form.priority_level}
            onChange={handleChange}
          >
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <button
          onClick={handleBook}
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}
