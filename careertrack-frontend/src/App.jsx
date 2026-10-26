import { useEffect, useState } from "react";
import api from "./services/api";
import ApplicationList from "./components/ApplicationList";
import ApplicationForm from "./components/ApplicationForm";
import "./App.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications");
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchApplications = async (companyName) => {
    try {
      if (companyName.trim() === "") {
        fetchApplications();
        return;
      }

      const response = await api.get(
        `/applications/search?companyName=${companyName}`,
      );

      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterApplications = async (applicationStatus) => {
    try {
      if (applicationStatus === "") {
        fetchApplications();
        return;
      }

      const response = await api.get(
        `/applications/status?status=${applicationStatus}`,
      );

      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>CareerTrack</h1>

        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Application"}
        </button>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Company Name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            searchApplications(e.target.value);
          }}
        />
      </div>

      <div className="filter-box">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            filterApplications(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="APPLIED">Applied</option>
          <option value="ONLINE_ASSESSMENT">Online Assessment</option>
          <option value="GROUP_DISCUSSION">Group Discussion</option>
          <option value="TECHNICAL_ROUND">Technical Round</option>
          <option value="HR_ROUND">HR Round</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {showForm && (
        <ApplicationForm
          fetchApplications={fetchApplications}
          setShowForm={setShowForm}
        />
      )}
      <ApplicationList
        applications={applications}
        fetchApplications={fetchApplications}
      />
    </div>
  );
}

export default App;
