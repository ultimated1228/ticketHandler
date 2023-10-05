const router = require('express').Router();
const bcrypt = require('bcrypt');
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
                return res.status(404).json({ message: 'Login failed. Please try again!' });
            }
    
            const validPassword = await bcrypt.compare(
                req.body.password,
                userData.password
            );
            console.log(validPassword)
            if (!validPassword) {
                return res.status(400).json({ message: 'Login failed. Please try again!' });
            }
    
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                req.session.user_name = userData.name;
                 res.redirect('/');
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