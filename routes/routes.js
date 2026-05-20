const express = require('express');
const router = express.Router();
const jobRoutes = require('./jobRoutes');

// Mount job routes at /jobs
router.use('/jobs', jobRoutes);


router.put('/:id', jobController.updateJob);


router.delete('/:id', jobController.deleteJob);

module.exports = router;