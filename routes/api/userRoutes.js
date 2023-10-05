const router = require('express').Router();

const { loginUser, logoutUser} = require('../../controllers/userController')
router.route('/')
    .post(loginUser)
    .delete(logoutUser)

module.exports = router;