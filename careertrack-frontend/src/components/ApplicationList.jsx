import api from "../services/api";
import ApplicationDetails from "./ApplicationDetails";
import { useState } from "react";
function ApplicationList({ applications, fetchApplications }) {
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const deleteApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);

      alert("Application Deleted Successfully!");

      await fetchApplications();
    } catch (error) {
      alert("Failed to delete application.");

      console.error(error);
    }
  };

  return (
    <>
      {applications.map((application) => (
        <div
          className="card"
          key={application.id}
          onClick={() =>
            setSelectedApplicationId(
              selectedApplicationId === application.id ? null : application.id,
            )
          }
        >
          <h3>{application.companyName}</h3>

          <p>
            <strong>Role:</strong> {application.role}
          </p>

          <p>
            <strong>Status:</strong> {application.status}
          </p>

          <p>
            <strong>Resume:</strong> {application.resumeVersion}
          </p>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteApplication(application.id);
            }}
          >
            Delete
          </button>
          {selectedApplicationId === application.id && (
            <ApplicationDetails
              application={application}
              fetchApplications={fetchApplications}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default ApplicationList;
