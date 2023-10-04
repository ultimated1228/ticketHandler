const express = require('express');
const router = express.Router();
const { createTicket, editTicket, archiveTicket } = require('../../controllers/ticketController');

//POST '/api/ticket'
router.route('/', createTicket)
    .post(createTicket);

router.put('/:id')
    //PUT '/api/ticket/:id'
    .put(editTicket)
    //DELETE '/api/ticket/:id'
    .delete(archiveTicket);

module.exports = router;
