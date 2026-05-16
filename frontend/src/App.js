import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(response => {
        setJobs(response.body || response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      // 🎨 මෙතනට අපි ලස්සන Light Blue Soft Background එකක් දැම්මා
      backgroundColor: "#ebf5fb", 
      minHeight: "100vh",
      padding: "20px"
    }}>
      {/* Header Section */}
      <header style={{
        textAlign: "center",
        marginBottom: "40px",
        padding: "30px 20px",
        // 🎨 Header එකට Soft Sky Blue සහ White Gradient එකක් දැම්මා
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        borderRadius: "16px",
        boxShadow: "0 4px 15px rgba(3, 169, 244, 0.1)",
        border: "1px solid #bbdefb"
      }}>
        <h1 style={{ color: "#1565c0", margin: "0 0 10px 0", fontSize: "2.5rem" }}>📍 Nearby Job Finder</h1>
        <p style={{ color: "#546e7a", margin: "0 0 25px 0", fontWeight: "500" }}>Find your dream job around your area easily</p>
        
        {/* Search Bar */}
        <input 
          type="text" 
          placeholder="🔍 Search by job title or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "80%",
            maxWidth: "500px",
            padding: "14px 24px",
            fontSize: "16px",
            border: "2px solid #90caf9", // Blue border
            borderRadius: "30px",
            outline: "none",
            boxShadow: "0 2px 8px rgba(33, 150, 243, 0.15)",
            transition: "all 0.3s"
          }}
        />
      </header>

      {/* Jobs List Section */}
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#1565c0", fontWeight: "bold" }}>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#546e7a" }}>No jobs found matching your search.</p>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px"
          }}>
            {filteredJobs.map(job => (
              <div 
                key={job._id} 
                onClick={() => setSelectedJob(job)}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "25px",
                  borderRadius: "14px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  // 🎨 Card එකේ පැත්තට ලස්සන Deep Blue Line එකක්
                  borderLeft: "6px solid #1e88e5", 
                  border: "1px solid #e3f2fd",
                  borderLeftWidth: "6px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(33, 150, 243, 0.2)";
                  e.currentTarget.style.borderColor = "#90caf9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)";
                  e.currentTarget.style.borderColor = "#e3f2fd";
                }}
              >
                <h3 style={{ color: "#0d47a1", margin: "0 0 12px 0" }}>{job.title}</h3>
                <p style={{ color: "#1976d2", fontWeight: "600", margin: "0 0 8px 0" }}>🏢 {job.company || "Not Specified"}</p>
                <p style={{ color: "#607d8b", margin: "0 0 20px 0", fontSize: "14px" }}>📍 {job.location}</p>
                <span style={{
                  // 🎨 Price tag එකත් Blue shade එකකින් හැදුවා
                  backgroundColor: "#e3f2fd",
                  color: "#0d47a1",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  Rs. {job.salary}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Job Description Popup (Modal) */}
      {selectedJob && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(13, 71, 161, 0.4)", // Blue overlay
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)" // Popup එක පිටුපස Blur වෙන්න
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 10px 40px rgba(13, 71, 161, 0.2)",
            position: "relative",
            border: "1px solid #bbdefb"
          }}>
            <h2 style={{ color: "#0d47a1", margin: "0 0 10px 0" }}>{selectedJob.title}</h2>
            <h4 style={{ color: "#1e88e5", margin: "0 0 20px 0" }}>🏢 {selectedJob.company || "Not Specified"}</h4>
            
            <div style={{ 
              marginBottom: "25px", 
              backgroundColor: "#f5f9fc", 
              padding: "15px", 
              borderRadius: "10px",
              border: "1px solid #e3f2fd"
            }}>
              <p style={{ margin: "8px 0", color: "#37474f" }}><strong>📍 Location:</strong> {selectedJob.location}</p>
              <p style={{ margin: "8px 0", color: "#37474f" }}><strong>💰 Salary:</strong> Rs. {selectedJob.salary}</p>
              {selectedJob.category && <p style={{ margin: "8px 0", color: "#37474f" }}><strong>📁 Category:</strong> {selectedJob.category}</p>}
            </div>

            <hr style={{ border: "0", borderTop: "1px solid #e3f2fd", margin: "20px 0" }} />
            
            <h4 style={{ color: "#0d47a1", margin: "0 0 10px 0" }}>Description:</h4>
            <p style={{ color: "#455a64", lineHeight: "1.6", margin: "0 0 30px 0" }}>{selectedJob.description}</p>
            
            <button 
              onClick={() => setSelectedJob(null)}
              style={{
                backgroundColor: "#d32f2f", // Red close button for contrast
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
                float: "right",
                boxShadow: "0 2px 5px rgba(211, 47, 47, 0.3)"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;