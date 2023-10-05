const router = require('express').Router();
const withAuth = require('../utils/auth');
const { renderHomepage, renderLogin } = require('../controllers/homeController')

// get request to '/' will use renderHomepage for the view if withAuth passes, otherwise withAuth will redirect to the login page
router.route('/')
    .get(renderHomepage, withAuth);

router.route('/login')
    .get(renderLogin);

module.exports = router;