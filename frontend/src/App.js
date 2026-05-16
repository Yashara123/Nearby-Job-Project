import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Application Form States
  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantDetails, setApplicantDetails] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsApplying(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantDetails('');
    setSubmitSuccess(false);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (applicantName && applicantEmail) {
      setSubmitSuccess(true);
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      backgroundColor: "#ebf5fb", // Soft Light Blue Background
      minHeight: "100vh",
      padding: "20px"
    }}>
      {/* 🌊 Header Section: Now with a stunning Deep Navy Blue Gradient! */}
      <header style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: "40px",
        padding: "40px 50px",
        background: "linear-gradient(135deg, #0a2540 0%, #1a365d 100%)", // Rich Navy Blue Gradient
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(10, 37, 64, 0.25)",
        border: "1px solid #0f2b48"
      }}>
        {/* Left Side: Text and Search */}
        <div style={{ flex: "1", minWidth: "300px", textAlign: "left" }}>
          {/* White Text to contrast with Navy Background */}
          <h1 style={{ color: "#ffffff", margin: "0 0 10px 0", fontSize: "2.6rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            📍 Nearby Job Finder
          </h1>
          <p style={{ color: "#93c5fd", margin: "0 0 30px 0", fontSize: "1.15rem", fontWeight: "500" }}>
            Find your dream job around your area easily
          </p>
          
          {/* Search Bar */}
          <input 
            type="text" 
            placeholder="🔍 Search by job title or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "450px",
              padding: "15px 25px",
              fontSize: "16px",
              border: "none",
              borderRadius: "30px",
              outline: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#ffffff",
              color: "#0a2540",
              transition: "all 0.3s"
            }}
          />
        </div>

        {/* Right Side: Vector Illustration */}
        <div style={{ flex: "1", minWidth: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img 
            src="https://img.freepik.com/free-vector/job-hunting-concept-illustration_114360-1793.jpg" 
            alt="Job Search Illustration" 
            style={{ 
              maxWidth: "320px", 
              width: "100%", 
              height: "auto",
              borderRadius: "12px",
              filter: "drop-shadow(0px 5px 15px rgba(0,0,0,0.1))" // Makes image stand out on dark background
            }} 
          />
        </div>
      </header>

      {/* Jobs List Section */}
      <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#0a2540", fontWeight: "bold" }}>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p style={{ textAlign: "center", color: "#546e7a" }}>No jobs found matching your search.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
            {filteredJobs.map(job => (
              <div 
                key={job._id} 
                onClick={() => setSelectedJob(job)}
                style={{
                  backgroundColor: "#ffffff",
                  padding: "25px",
                  borderRadius: "14px",
                  boxShadow: "0 4px 15px rgba(10, 37, 64, 0.05)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  borderLeft: "6px solid #0a2540", // Navy Blue Accents on cards
                  border: "1px solid #e3f2fd",
                  borderLeftWidth: "6px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(10, 37, 64, 0.15)";
                  e.currentTarget.style.borderColor = "#90caf9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(10, 37, 64, 0.05)";
                  e.currentTarget.style.borderColor = "#e3f2fd";
                }}
              >
                <h3 style={{ color: "#0a2540", margin: "0 0 12px 0", fontWeight: "700" }}>{job.title}</h3>
                <p style={{ color: "#1e88e5", fontWeight: "600", margin: "0 0 8px 0" }}>🏢 {job.company || "Not Specified"}</p>
                <p style={{ color: "#607d8b", margin: "0 0 20px 0", fontSize: "14px" }}>📍 {job.location}</p>
                <span style={{ backgroundColor: "#e3f2fd", color: "#0a2540", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>
                  Rs. {job.salary}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Details & Form Modal */}
      {selectedJob && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(10, 37, 64, 0.5)", display: "flex", // Navy overlay
          justifyContent: "center", alignItems: "center", zIndex: 1000, backdropFilter: "blur(4px)"
        }}>
          <div style={{
            backgroundColor: "#ffffff", padding: "35px", borderRadius: "16px",
            width: "90%", maxWidth: "550px", maxHeight: "85vh", overflowY: "auto",
            boxShadow: "0 10px 40px rgba(10, 37, 64, 0.3)", border: "1px solid #bbdefb"
          }}>
            
            {!isApplying ? (
              <div>
                <h2 style={{ color: "#0a2540", margin: "0 0 10px 0" }}>{selectedJob.title}</h2>
                <h4 style={{ color: "#1e88e5", margin: "0 0 20px 0" }}>🏢 {selectedJob.company || "Not Specified"}</h4>
                
                <div style={{ marginBottom: "20px", backgroundColor: "#f5f9fc", padding: "15px", borderRadius: "10px", border: "1px solid #e3f2fd" }}>
                  <p style={{ margin: "8px 0", color: "#37474f" }}><strong>📍 Location:</strong> {selectedJob.location}</p>
                  <p style={{ margin: "8px 0", color: "#37474f" }}><strong>💰 Salary:</strong> Rs. {selectedJob.salary}</p>
                  {selectedJob.category && <p style={{ margin: "8px 0", color: "#37474f" }}><strong>📁 Category:</strong> {selectedJob.category}</p>}
                </div>

                <h4 style={{ color: "#0a2540", margin: "0 0 10px 0" }}>📋 Required Qualifications:</h4>
                <ul style={{ color: "#455a64", paddingLeft: "20px", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                  <li>Excellent communication and problem-solving skills.</li>
                  <li>Prior experience or relevant educational background for the role.</li>
                  <li>Ability to work efficiently under local regional environments.</li>
                </ul>

                <h4 style={{ color: "#0a2540", margin: "0 0 10px 0" }}>Description:</h4>
                <p style={{ color: "#455a64", lineHeight: "1.6", margin: "0 0 30px 0" }}>{selectedJob.description}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                  <button onClick={handleCloseModal} style={{ backgroundColor: "#78909c", color: "white", border: "none", padding: "12px 25px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }}>
                    Close
                  </button>
                  {/* Navy Blue Button */}
                  <button onClick={() => setIsApplying(true)} style={{ backgroundColor: "#0a2540", color: "white", border: "none", padding: "12px 30px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 10px rgba(10, 37, 64, 0.3)" }}>
                    Apply For This Job 🚀
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ color: "#0a2540", margin: "0 0 5px 0" }}>Job Application</h3>
                <p style={{ color: "#1e88e5", margin: "0 0 20px 0", fontWeight: "500" }}>Applying for: {selectedJob.title}</p>

                {submitSuccess ? (
                  <div style={{ textAlign: "center", padding: "30px 10px" }}>
                    <h2 style={{ color: "#2e7d32", margin: "0 0 10px 0" }}>🎉 Success!</h2>
                    <p style={{ color: "#455a64", fontWeight: "500", lineHeight: "1.5" }}>
                      Your application with personal details has been submitted successfully to <strong>{selectedJob.company || "the employer"}</strong>!
                    </p>
                    <button onClick={handleCloseModal} style={{ backgroundColor: "#0a2540", color: "white", border: "none", padding: "12px 30px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", marginTop: "25px" }}>
                      Awesome, Thank You!
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit}>
                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", color: "#37474f", fontWeight: "600", marginBottom: "5px" }}>Full Name *</label>
                      <input type="text" required value={applicantName} onChange={(e) => setApplicantName(e.target.value)} placeholder="Enter your full name" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #b0bec5", outline: "none" }} />
                    </div>

                    <div style={{ marginBottom: "15px" }}>
                      <label style={{ display: "block", color: "#37474f", fontWeight: "600", marginBottom: "5px" }}>Email Address *</label>
                      <input type="email" required value={applicantEmail} onChange={(e) => setApplicantEmail(e.target.value)} placeholder="Enter your email address" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #b0bec5", outline: "none" }} />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", color: "#37474f", fontWeight: "600", marginBottom: "5px" }}>Qualifications & Experience Summary</label>
                      <textarea rows="4" value={applicantDetails} onChange={(e) => setApplicantDetails(e.target.value)} placeholder="Briefly write your skills, qualifications, or paste your resume text here..." style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #b0bec5", outline: "none", resize: "none", fontFamily: "inherit" }}></textarea>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "25px" }}>
                      <button type="button" onClick={() => setIsApplying(false)} style={{ backgroundColor: "#cfd8dc", color: "#37474f", border: "none", padding: "12px 25px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }}>
                        Back
                      </button>
                      <button type="submit" style={{ backgroundColor: "#0a2540", color: "white", border: "none", padding: "12px 30px", borderRadius: "25px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 10px rgba(10, 37, 64, 0.3)" }}>
                        Submit Application 📤
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default App;