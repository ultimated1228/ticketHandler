const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const helpers = require('./utils/helpers');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./utils/connection');
const auth = require('./utils/auth');
const handlebars = exphbs.create({helpers, auth});



const app = express();
const port = process.env.PORT || 3001;

//handlebars as the view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(routes)

//express-session
app.use(session({
  secret: 'our super secret secret',
  resave: false,
  saveUninitialized: true
}));








sequelize.sync().then(() => {


// incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

})
