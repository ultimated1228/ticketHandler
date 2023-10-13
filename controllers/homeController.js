const { Log, Ticket, User } = require('../models');
const { Op } = require("sequelize");

module.exports = {
    renderHomepage: async function (req, res) {
        try {
            const dbTickets = await Ticket.findAll({
                where: req.session.role === "client"? {
                    client_id: req.session.user_id,
                }: {
                    [Op.or]: [
                        { tech_id: req.session.user_id },
                        { status: "Open" }
                    ]
                },
                include: [{ model: User, as:"client", }, {model: User, as: "tech",}]
            
            });
            const dbLogs = await Log.findAll({
                include: [{ model: Ticket }]
            });
            const tickets = dbTickets.map((ticket) => {
                return ticket.get({ plain: true })
            });
            const logs = dbLogs.map((log) => {
                return log.get({ plain: true })
            });
            res.render('homepage', { tickets, logs, user:req.session.user_name, userRole: req.session.role })
            res.status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
    
    renderLogin: async function (req, res) {
        try {
            res.render('login', {
                loggedIn: req.session.logged_in
            });
            res.status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },

    renderTicket: async function (req, res) {
        try {

            const dbTickets = await Ticket.findByPk( req.params.id, {
            include: [{ model: Log, include: [
                {
                    model: User
                }
            ]
        },
        { model: User, as:"client", }, {model: User, as: "tech",}
            ]
        });
            const ticket = dbTickets.get({ plain: true });

            res.render('ticket', {
                loggedIn: req.session.logged_in,
                user: req.session.user_name,
                currentUserId: req.session.user_id,
                ticket
            });
            console.log(ticket)
            res.status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}