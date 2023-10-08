// npm package and local imports
const Log = require("./Log");
const Ticket = require("./Ticket");
const User = require("./User");

//-----------------------Model Relations-----------------------

// Ticket will have a foreign key client_id that looks at the primary key of the user instance who created it
Ticket.belongsTo(User, {
  foreignKey: "client_id",
  as: "client",
});
// Ticket will have a foreign key tech_id that looks at the primary key of the user instance who claimed it
Ticket.belongsTo(User, {
  foreignKey: "tech_id",
  as: "tech",
});

// Log will have a foreign key ticketId that looks at the primary key of the ticket instance that created it
Log.belongsTo(Ticket, {
  foreignKey: "ticketId",
});

Log.belongsTo(User, {
  foreignKey: "userId",
});

//----------------------- Havers -----------------------
// Basically, a 'haver' wont have a foreign key for a relation unless they both have each other

Ticket.hasMany(Log, {
  foreignKey: "ticketId",
});

User.hasMany(Log, {
  foreignKey: "userId",
});

// model exports for use in other files
module.exports = { Log, Ticket, User };
