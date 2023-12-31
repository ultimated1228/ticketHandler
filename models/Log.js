const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Ticket = require('./Ticket')
const User = require('./User')

class Log extends Model { }

Log.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'ticket',
                key: 'id',
            },
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Message",
            validate: {
                isIn: {
                    args: [["Created", "Modified", "Message"]],
                    msg: "Type must be 'Created', 'Modified', or 'Message'",
                },
                notNull: true,
            },
        },
        isHidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'log',
    }
);

module.exports = Log;
