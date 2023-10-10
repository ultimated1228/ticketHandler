const router = require('express').Router();

const { loginUser, logoutUser, signupUser} = require('../../controllers/userController');

// route is /api/users
router.route('/')
    .post(loginUser)
    
    .delete(logoutUser)
    
router.route ('/signup')
.post(signupUser)

module.exports = router;