import { useEffect, useState } from "react";
import API from "../services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const patientSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must be digits only")
      .required("Phone is required"),
  });

  const handleCreate = async (values, { resetForm }) => {
    try {
      const res = await API.post("/patients", values);
      setPatients([...patients, res.data]);
      setSuccess("Patient added successfully!");
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Error creating patient");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h2>Patient Management</h2>
        <p className="page-subtitle">Add new patients and view existing records.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="card">
        <Formik
          initialValues={{ first_name: "", last_name: "", phone: "" }}
          validationSchema={patientSchema}
          onSubmit={handleCreate}
        >
          {() => (
            <Form>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <Field className="form-input" name="first_name" placeholder="First Name" />
                  <ErrorMessage name="first_name" component="div" className="form-error" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <Field className="form-input" name="last_name" placeholder="Last Name" />
                  <ErrorMessage name="last_name" component="div" className="form-error" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <Field className="form-input" name="phone" placeholder="Phone" />
                  <ErrorMessage name="phone" component="div" className="form-error" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Add Patient</button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="card">
        {patients.length === 0 ? (
          <p className="empty-state">No patients found.</p>
        ) : (
          <ul className="list-reset">
            {patients.map((p) => (
              <li key={p.id || p.patient_id} className="list-item">
                <span>{p.first_name} {p.last_name}</span>
                <span className="page-subtitle">{p.phone}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
