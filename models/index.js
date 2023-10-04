// npm package and local imports
const Log = require('./Log');
const Ticket = require('./Ticket');
const User = require('./User');


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

//Ticket has many logs (I don't see an ID being created within the ticket model, so I'm not sure this is referencing the right foreign key)
Ticket.hasMany(Log, {
    foreignKey: 'ticket_id'
});

//log belongs to ticket (however, once again, I don't see a ticket_id within the ticket model, so I'm not sure if this is the correct reference)
Log.belongsTo(Ticket, {
    foreignKey: 'ticket_id'
});

// model exports for use in other files
module.exports = { Log, Ticket, User }