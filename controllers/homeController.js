const { Log, Ticket, User } = require('../models');

module.exports = {
    renderHomepage: async function (req, res) {
        try {
            const dbTickets = await Ticket.findAll({
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
            res.render('homepage', { tickets, logs, partials: { ticketRow: 'ticketRow' } })
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
            include: [{ model: Log }, { model: User, as:"client" } ]
        });
            const ticket = dbTickets.get({ plain: true });

            res.render('ticket', {
                loggedIn: req.session.logged_in,
                ticket
            });
            res.status(200);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    },
}