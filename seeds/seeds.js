const userSeedData = require('./userData.json');
const ticketData = require('./ticketData.json')
const logData = require('./logData.json')
//any new files should be added on their own line with own variable below
const sequelize = require('../utils/connection');
// any new models need to be added to the curly bracket comma separated
const { User, Ticket, Log } = require('../models');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n --------- Database Synced ---------\n')
  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n --------- Users Seeded ---------\n');
  await Ticket.bulkCreate(ticketData,{
    individualHooks: true,
    returning: true,
  });
  console.log('\n --------- Tickets Seeded ---------\n');
  await Log.bulkCreate(logData,{
    individualHooks: true,
    returning: true,
  });
  console.log('\n --------- Logs Seeded ---------\n');
  //any new seed files will need to be added here using the below syntax and reffering to the const value assigned above
  process.exit(0);
};

seedDatabase();
