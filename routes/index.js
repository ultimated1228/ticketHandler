const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// routes for controlling views
router.use('/',homeRoutes);

// routes for controlling data
router.use('/api',apiRoutes);

module.exports = router;