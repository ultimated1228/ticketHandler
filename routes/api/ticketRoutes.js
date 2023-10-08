const express = require('express');
const router = express.Router();
const { createTicket, editTicket, archiveTicket } = require('../../controllers/ticketController');

//POST '/api/tickets'
router.route('/', createTicket)
    .post(createTicket);

router.route('/:id')
    //PUT '/api/tickets/:id'
    .put(editTicket)
    //DELETE '/api/tickets/:id'
    .delete(archiveTicket);

module.exports = router;
