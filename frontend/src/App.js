import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Backend එකෙන් data ගේන හැටි
    axios.get('http://localhost:5000/api/jobs')
      .then(res => {
        setJobs(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Available Jobs</h1>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            {job.title} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;