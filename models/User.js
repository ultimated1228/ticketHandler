const { Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/connection')
const bcrypt = require('bcrypt');
const Ticket = require('./Ticket')
const Log = require('./Log')

class User extends Model {
    // Instance method to verify password
    async verifyPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEqual: {
                args: ['password'],
                msg: 'Password cannot be "password"',
            },
            len: {
                args: [6],
                msg: 'Password must be at least 6 characters long',
            },
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'client',
        validate: {
            isIn: [['tech', 'client']],
        }
    }
},
{
    hooks: {
        beforeCreate: async (user) => {
            user.password = await bcrypt.hash(user.password, 10);
            user.email = user.email.toLowerCase();
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
            if (user.changed('email')) {
                user.email = user.email.toLowerCase();
            }
        },
    },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
)

module.exports = User;