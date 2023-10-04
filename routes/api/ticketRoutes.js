const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');

//'/api/ticket'
router.post('/', ticketController.createTicket);

//'/api/ticket/:id'
router.put('/:id', ticketController.editTicket);
router.delete('/:id', ticketController.archiveTicket);

module.exports = router;
