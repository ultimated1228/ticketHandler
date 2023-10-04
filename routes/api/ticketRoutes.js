const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');

//POST '/api/ticket'
router.post('/', ticketController.createTicket);
//PUT '/api/ticket/:id'
router.put('/:id', ticketController.editTicket);
//DELETE '/api/ticket/:id'
router.delete('/:id', ticketController.archiveTicket);

module.exports = router;
