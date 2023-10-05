const router = require('express').Router();

const { loginUser, logoutUser} = require('../../controllers/userController');

// route is /api
router.route('/')
    .post(loginUser)
    .delete(logoutUser)

module.exports = router;