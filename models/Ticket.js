// npm package and local imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const Log = require("./Log");
const User = require("./User");
const { findDiff } = require("../utils/helpers");


//class definition
class Ticket extends Model {
  // Instance methods
  async logChange(userId, oldData) {
    const differences = await findDiff(this, oldData);
    if (differences.length == 0) {
      return;
    } else {
      const log = new Log();
      log.type = "Modified";
      log.message = `${
        differences.length
      } changes were made on ${new Date()} by ${userId}.
${differences.reduce((fullString, currentString) => {
  return `${fullString}
${currentString}`;
}, "")}`;
      log.userId = userId;
      log.ticketId = this.id;
      log.save();
    }
  }
}

//model initialization
Ticket.init(
  {
    // client_ id refers to the user who created the ticket by referencing the primary key value of that User instance
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    // tech_ id refers to the user who claimed the ticket by referencing the primary key value of that User instance
    tech_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Open", "Pending", "Resolved", "Claimed"]],
          msg: "status must be `Open`, `Pending`, `Resolved`, or `Claimed`",
        },
        notNull: true,
      },
      defaultValue: "Open",
    },
    urgency: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["Low", "Medium", "High"]],
          msg: "urgency must be `Low`, `Medium`, or `High`",
        },
        notNull: true,
      },
      defaultValue: "Low",
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: true,
      },
      defaultValue: false,
    },
  },
  {
    hooks: {
      //after a Ticket instance is created, make a Created Log that is assoicated with it
      afterCreate: async (newTicket) => {
        try {
          const req = {
            message: `Ticket number ${newTicket.id} created`,
            type: "Created",
          };

          const res = await fetch(`/api/logs/${newTicket.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
          });
          if (res.ok) {
            console.log("\nsuccesfully created log for new ticket\n");
            location.replace(`/ticket/${newTicket.id}`);
          }
        } catch (error) {
          console.log('\nfailed to create log for new ticket\n')
          console.error(error);
        }
      },
      afterUpdate: (updatedTicket) => {
        if (updatedTicket.status == "Resolved") {
          updatedTicket.isArchived = true;
        }
        return updatedTicket;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "ticket",
  }
);

module.exports = Ticket;
