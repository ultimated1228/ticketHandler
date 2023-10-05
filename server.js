// Include environment variables
require('dotenv').config();

// Include node modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Include other modules
const auth = require('./utils/auth');
const routes = require('./routes');
const helpers = require('./utils/helpers');
const sequelize = require('./utils/connection');
// Set up middleware
const app = express();
const port = process.env.PORT || 3001;
const hbs = exphbs.create({helpers, auth});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

//express-session
app.use(session({
  secret: 'our super secret secret',
  resave: false,
  saveUninitialized: true,

  // Same as above comment on line 10
  // store: new SequelizeStore({
  //   db:sequelize
  // })
  
}));
app.use(routes)

// Sync database before starting the server
async function start() {
  await sequelize.sync({force:false});
  console.log('db is connected')
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  });
}

// Start the server
start();