const router = require('express').Router();
const logRoutes = require('./logRoutes');
const ticketRoutes = require('./ticketRoutes');
const userRoutes = require('./userRoutes');
const withAuth = require ('../../utils/auth')
const {getDashboardData} = require ('../../public/js/dashboard')

router.use('/logs',logRoutes);
router.use('/tickets',ticketRoutes);
router.use('/users',userRoutes);

router.get('/dashboard/:status?', withAuth, getDashboardData)

module.exports = router;