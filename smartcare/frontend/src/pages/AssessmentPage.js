import { useState } from "react";
import API from "../services/api";

export default function AssessmentPage() {
  const [symptoms, setSymptoms] = useState({
    chestPain: false,
    difficultyBreathing: false,
    severeBleeding: false,
    collectingMedication: false,
    fluSymptoms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (field) => (e) => {
    setSymptoms((prev) => ({
      ...prev,
      [field]: e.target.value === "yes",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setResult(null);

    try {
      const response = await API.post("/assessments", {
        symptoms: {
          chestPain: symptoms.chestPain,
          difficultyBreathing: symptoms.difficultyBreathing,
          severeBleeding: symptoms.severeBleeding,
          collectingMedication: symptoms.collectingMedication,
          fluSymptoms: symptoms.fluSymptoms,
        },
      });

      setResult(response.data);
      setSuccess("Assessment submitted successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "An error occurred while submitting your assessment. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const yesNoField = (field, label) => (
    <div className="form-group" key={field}>
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        value={symptoms[field] ? "yes" : "no"}
        onChange={handleChange(field)}
      >
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </div>
  );

  return (
    <div className="page-narrow">
      <div className="card">
        <h1 className="page-header">Symptom Assessment</h1>
        <p className="page-subtitle">
          Please answer the following questions so we can determine the
          appropriate priority level and recommended service for you.
        </p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && !error && (
          <div className="alert alert-success">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          {yesNoField("chestPain", "Do you have chest pain?")}
          {yesNoField(
            "difficultyBreathing",
            "Do you have difficulty breathing?",
          )}
          {yesNoField(
            "severeBleeding",
            "Are you experiencing severe bleeding?",
          )}
          {yesNoField("collectingMedication", "Are you collecting medication?")}
          {yesNoField("fluSymptoms", "Do you have flu-like symptoms?")}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Assessment"}
          </button>
        </form>

        {result && (
          <div className="card">
            <h2 className="page-header">Assessment Result</h2>
            <p>
              <strong>Priority Level:</strong> {result.priority_level}
            </p>
            <p>
              <strong>Recommended Service:</strong> {result.recommended_service}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
