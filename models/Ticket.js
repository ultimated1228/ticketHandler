// npm package and local imports
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/connection')
const Log = require('../models/Log')

//class definition
class Ticket extends Model {
    // TODO Instance methods
    async logChange(userId, oldData) {
        return;
    }
}

//model initialization
Ticket.init({
    // schema definition
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
            //custom validator, ensures that the value of status is valid
            statusType(status) {
                if (status != 'Open' || 'Pending' || 'Resolved' || 'Claimed') {
                    throw new Error("status must be `Open`, `Pending`, `Resolved`, or `Claimed`");
                }
            },
            notNull: true
        },
        defaultValue: 'Open'
    },
    urgency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //custom validator, ensures that the value of urgency is valid
            urgencyType(urgency) {
                if (urgency != 'Low' || 'Medium' || 'High') {
                    throw new Error("urgency must be `Low`, `Medium`, or `High`");
                }
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
            Log.userId =  newTicket.client;
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ticket'
})