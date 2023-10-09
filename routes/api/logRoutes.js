const router = require('express').Router();

const { createLog, editLog, deleteLog } = require('../../controllers/logController');

//The routes will match '/api/logs/:ticketId?drawer=BOOLEAN' to handle POST calls.
router.route('/')
    .post(createLog)
//The routes will also match '/api/logs/:ticketId/:logId?drawer=BOOLEAN' to handle PUT, and DELETE calls.
router.route('/:ticketID/:logID')
    .put(editLog)
    .delete(deleteLog)

module.exports = router;