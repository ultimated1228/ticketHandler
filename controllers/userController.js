const router = require('express').Router();
const { User } = require('../models');

const controller = {

    loginUser: async (req, res) => {
        //login user
        try {
            console.log(req.body)
            const userData = await User.findOne({
                raw: true,
                where: { email: req.body.email },
            });
            if (!userData) {
                res.status(404).json({ message: 'Login failed. Please try again!' });
                return;
            }
    
            const validPassword = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            if (!validPassword) {
                res.status(400).json({ message: 'Login failed. Please try again!' });
                return;
            }
    
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                req.session.user_name = userData.name;
                return res.redirect('/');
            });
        } catch(err) {
            res.status(500).json(err);
        }
    },

    logoutUser: (req, res) => {
        req.session.destroy(()=> res.redirect('/login'));
        
    },

}

module.exports = controller