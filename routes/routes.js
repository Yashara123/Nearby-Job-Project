const express = require('express');
const router = express.Router();
const jobRoutes = require('./jobRoutes');

// Mount job routes at /jobs
router.use('/jobs', jobRoutes);

module.exports = router;