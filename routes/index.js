const express = require('express')
const router = express.Router();

const v1AptRoutes = require('./v1/index')
router.use('/v1',v1AptRoutes);
module.exports = router;