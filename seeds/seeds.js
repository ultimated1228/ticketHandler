<<<<<<< HEAD
const sequelize = require('../utils/connection');
// any new models need to be added to the curly bracket comma separated
=======
const userSeedData = require('./userData.json');
const sequelize = require('../utils/connection');
>>>>>>> 66eff03eb13583d1845b375517e7933a544abc87
const { User } = require('../models');

// any new models need to be added to the curly bracket comma separated
//any new files should be added on their own line with own variable below

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n --------- Database Synced ---------\n')
  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  console.log('\n --------- Users Seeded ---------\n')
  //any new seed files will need to be added here using the below syntax and reffering to the const value assigned above
  process.exit(0);
};

seedDatabase();
