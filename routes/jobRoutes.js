const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// REST routes for jobs
router.get('/', jobController.getAllJobs);
router.post('/', jobController.createJob);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;