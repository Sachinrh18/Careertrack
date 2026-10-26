import { useState } from "react";
import api from "../services/api";

function ApplicationForm({ fetchApplications, setShowForm }) {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [resumeVersion, setResumeVersion] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [notes, setNotes] = useState("");

  const saveApplication = async (e) => {
    e.preventDefault();

    const application = {
      companyName,
      role,
      appliedDate,
      status,
      resumeVersion,
      jobLink,
      notes,
    };

    try {
      await api.post("/applications", application);
      await fetchApplications();

      alert("Application Saved Successfully!");

      setCompanyName("");
      setRole("");
      setAppliedDate("");
      setStatus("APPLIED");
      setResumeVersion("");
      setJobLink("");
      setNotes("");

      setShowForm(false);
    } catch (error) {
      alert("Failed to save application.");

      console.error(error);
    }
  };

  return (
    <div className="form-card">
      <h2>Add Application</h2>

      <form onSubmit={saveApplication}>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Role</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label>Applied Date</label>
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>APPLIED</option>
          <option>ONLINE_ASSESSMENT</option>
          <option>GROUP_DISCUSSION</option>
          <option>TECHNICAL_ROUND</option>
          <option>HR_ROUND</option>
          <option>OFFER</option>
          <option>REJECTED</option>
        </select>

        <label>Resume Version</label>
        <input
          type="text"
          value={resumeVersion}
          onChange={(e) => setResumeVersion(e.target.value)}
        />

        <label>Job Link</label>
        <input
          type="text"
          value={jobLink}
          onChange={(e) => setJobLink(e.target.value)}
        />

        <label>Notes</label>
        <textarea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ApplicationForm;
