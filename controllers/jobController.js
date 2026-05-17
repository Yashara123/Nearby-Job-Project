const Job = require('../models/Job');


exports.createJob = async (req, res) => {
    try {
        const newJob = new Job(req.body);
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,      
            { new: true, runValidators: true } 
        );
        
        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id); 
        
        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json({ message: "Job deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};