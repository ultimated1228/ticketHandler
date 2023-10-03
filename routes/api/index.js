const router = require('express').Router();
const logRoutes = require('./logRoutes');
const ticketRoutes = require('./ticketRoutes');
const userRoutes = require('./userRoutes');

router.use('/logs',logRoutes);
router.use('/tickets',ticketRoutes);
router.use('users',userRoutes);

module.exports = router;