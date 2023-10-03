const sequelize = require('../config/connection');
// any new models need to be added to the curly bracket comma separated
const { User } = require('../models');
//any new files should be added on their own line with own variable below
const userSeedData = require('./userData.json')


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  //any new seed files will need to be added here using the below syntax and reffering to the const value assigned above
  await User.bulkCreate(userSeedData);
  process.exit(0);
};

seedDatabase();
