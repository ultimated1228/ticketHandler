// npm package and local imports
const { DataTypes } = require('sequelize')
const Log = require('../models/Log');
const Ticket = require('../models/Ticket');
const User = require('../models/User');


//-----------------------Model Relations-----------------------

// Ticket belongsTo User
Ticket.belongsTo(User, {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        notNull: true
    },
    foreignKey: 'client'
});
// Ticket belongsTo User, prior to being claimed by a tech will be NULL
Ticket.belongsTo(User, {
    type: DataTypes.INTEGER,
    allowNull: true,
    foreignKey: 'tech'
});

// model exports for use in other files
module.exports = { Log, Ticket, User }