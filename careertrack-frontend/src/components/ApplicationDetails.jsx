import { useState } from "react";
import api from "../services/api";

function ApplicationDetails({ application, fetchApplications }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.notes);

  const updateApplication = async () => {
    try {
      await api.put(`/applications/${application.id}/status`, null, {
        params: {
          status: status,
          notes: notes,
        },
      });

      alert("Application Updated Successfully!");

      await fetchApplications();

      setIsEditing(false);
    } catch (error) {
      alert("Failed to update application.");

      console.error(error);
    }
  };

  return (
    <div className="details">
      <hr />

      <p>
        <strong>Applied Date:</strong> {application.appliedDate}
      </p>

      <p>
        <strong>Job Link:</strong> {application.jobLink}
      </p>

      {isEditing ? (
        <div className="edit-form" onClick={(e) => e.stopPropagation()}>
          <label>Status</label>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="APPLIED">APPLIED</option>
            <option value="ONLINE_ASSESSMENT">ONLINE_ASSESSMENT</option>
            <option value="GROUP_DISCUSSION">GROUP_DISCUSSION</option>
            <option value="TECHNICAL_ROUND">TECHNICAL_ROUND</option>
            <option value="HR_ROUND">HR_ROUND</option>
            <option value="OFFER">OFFER</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <label>Notes</label>

          <textarea
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button className="update-btn" onClick={updateApplication}>
            Save Changes
          </button>
        </div>
      ) : (
        <>
          <p>
            <strong>Notes:</strong> {application.notes}
          </p>

          <button
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default ApplicationDetails;
