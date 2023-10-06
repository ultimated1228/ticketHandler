// npm package and local imports
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/connection')
const Log = require('./Log')
const User = require('./User')

//class definition
class Ticket extends Model {
    // Instance methods
    async logChange(userId, oldData) {
        const findDiff = await findDiff(this, oldData);
        if (findDiff.length == 0) { return }
        else {
            const log = new Log()
            log.type = 'Modified';
            log.message = `${findDiff.length} changes were made on ${new Date} by ${userId}.
${findDiff.reduce((fullString, currentString) => {
                return `${fullString}
${currentString}`
            }, "")}`;
            log.userId = userId;
            log.ticketId = this.id;
            log.save();
        };
    };
};

//model initialization
Ticket.init({
    // schema definition
    client_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    tech_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: true,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['Open', 'Pending', 'Resolved', 'Claimed']],
                msg: 'status must be `Open`, `Pending`, `Resolved`, or `Claimed`',
            },
            notNull: true
        },
        defaultValue: 'Open'
    },
    urgency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['Low', 'Medium', 'High']],
                msg: 'urgency must be `Low`, `Medium`, or `High`',
            },
            notNull: true
        },
        defaultValue: 'Low'
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: true
        },
        defaultValue: false
    }
}, {
    hooks: {
        afterCreate: (newTicket) => {
            Log.type = 'Created';
            Log.message = `Ticket number ${newTicket.id}`;
            Log.userId = newTicket.client;
            Log.ticketId = newTicket.id;
            return newTicket;
        },
        afterUpdate: (updatedTicket) => {
            if (updatedTicket.status == 'Resolved') {
                updatedTicket.isArchived = true;
            }
            return updatedTicket;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticket'
})

module.exports = Ticket;