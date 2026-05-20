import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || '/api/jobs';

// Format salary for display
function formatSalary(salary) {
  if (salary == null || salary === '') return 'Not disclosed';
  return typeof salary === 'number' ? salary.toLocaleString() : String(salary);
}

// Single job card on homepage
function JobCard({ job, onSelect }) {
  return (
    <article className="job-card" onClick={() => onSelect(job)}>
      <div className="job-card-body">
        {job.category && <span className="job-card-category">{job.category}</span>}
        <h3 className="job-card-title">{job.title}</h3>
        <p className="job-card-company">🏢 {job.company || 'Not Specified'}</p>
        <p className="job-card-location">📍 {job.location}</p>
        {job.description && (
          <p className="job-card-description">{job.description}</p>
        )}
      </div>
      <div className="job-card-footer">
        <span className="job-card-salary">Rs. {formatSalary(job.salary)}</span>
        <span className="job-card-action">View details →</span>
      </div>
    </article>
  );
}

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isApplying, setIsApplying] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantDetails, setApplicantDetails] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load jobs from API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching jobs:', err);
        setError('Could not load jobs. Make sure the backend server is running.');
        setLoading(false);
      });
  }, []);

  // Filter jobs by search term
  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase();
    return (
      (job.title?.toLowerCase() || '').includes(term) ||
      (job.location?.toLowerCase() || '').includes(term) ||
      (job.company?.toLowerCase() || '').includes(term)
    );
  });

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
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="header-title">📍 Nearby Job Finder</h1>
          <p className="header-subtitle">Find your dream job around your area easily</p>
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="header-illustration">
          <img
            src="https://img.freepik.com/free-vector/job-hunting-concept-illustration_114360-1793.jpg"
            alt="Job Search Illustration"
          />
        </div>
      </header>

      {/* Job cards grid */}
      <main className="jobs-main">
        {!loading && !error && (
          <div className="jobs-section-header">
            <h2 className="jobs-section-title">Available Jobs</h2>
            <span className="jobs-count">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </span>
          </div>
        )}

        {loading && <p className="status-message loading">Loading jobs...</p>}
        {error && <p className="status-message">{error}</p>}
        {!loading && !error && filteredJobs.length === 0 && (
          <p className="status-message">No jobs found matching your search.</p>
        )}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard key={job._id} job={job} onSelect={setSelectedJob} />
            ))}
          </div>
        )}
      </main>

      {/* Job details and apply modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {!isApplying ? (
              <div>
                <h2 className="modal-title">{selectedJob.title}</h2>
                <h4 className="modal-company">🏢 {selectedJob.company || 'Not Specified'}</h4>

                <div className="modal-details">
                  <p><strong>📍 Location:</strong> {selectedJob.location}</p>
                  <p><strong>💰 Salary:</strong> Rs. {formatSalary(selectedJob.salary)}</p>
                  {selectedJob.category && (
                    <p><strong>📁 Category:</strong> {selectedJob.category}</p>
                  )}
                </div>

                <h4 className="modal-section-title">📋 Required Qualifications:</h4>
                <ul style={{ color: '#455a64', paddingLeft: '20px', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  <li>Excellent communication and problem-solving skills.</li>
                  <li>Prior experience or relevant educational background for the role.</li>
                  <li>Ability to work efficiently under local regional environments.</li>
                </ul>

                <h4 className="modal-section-title">Description:</h4>
                <p className="modal-description">{selectedJob.description}</p>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => setIsApplying(true)}>
                    Apply For This Job 🚀
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="modal-title">Job Application</h3>
                <p className="modal-company">Applying for: {selectedJob.title}</p>

                {submitSuccess ? (
                  <div className="success-message">
                    <h2>🎉 Success!</h2>
                    <p>
                      Your application has been submitted successfully to{' '}
                      <strong>{selectedJob.company || 'the employer'}</strong>!
                    </p>
                    <button type="button" className="btn btn-primary" onClick={handleCloseModal}>
                      Awesome, Thank You!
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplySubmit}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="form-group">
                      <label>Qualifications & Experience Summary</label>
                      <textarea
                        rows="4"
                        value={applicantDetails}
                        onChange={(e) => setApplicantDetails(e.target.value)}
                        placeholder="Briefly write your skills, qualifications, or paste your resume text here..."
                      />
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="btn btn-muted" onClick={() => setIsApplying(false)}>
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary">
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
