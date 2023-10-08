const router = require('express').Router();
const withAuth = require('../utils/auth');
const { renderHomepage, renderLogin, renderTicket } = require('../controllers/homeController')

// get request to '/' will use renderHomepage for the view if withAuth passes, otherwise withAuth will redirect to the login page
router.route('/')
    .get(withAuth, renderHomepage);

router.route('/login')
    .get(renderLogin);

router.route('/ticket')
    .get(withAuth, renderTicket);

    router.route('/:status')
    .get(withAuth, renderHomepage);
    
module.exports = router;