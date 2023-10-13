const express = require('express');
const router = express.Router();
const { createTicket, editTicket, archiveTicket, assignTech } = require('../../controllers/ticketController');

//POST '/api/tickets'
router.post('/', createTicket)

router.route('/assign-tech/:ticketId')
    .post(assignTech);

router.route('/:id')
    //PUT '/api/tickets/:id'
    .put(editTicket)
    //DELETE '/api/tickets/:id'
    .delete(archiveTicket);

module.exports = router;
