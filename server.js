const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes');
const helpers = require('./utils/helpers');
const session = require('express-session');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const auth = require('./utils/auth');
const handlebars = exphbs.create({helpers, auth});

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//handlebars as the view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(routes)

//express-session
app.use(session({
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: true
}));

//mysql database
const connectToDatabase = async () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST || '',
      user: process.env.DB_USER || '',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || ''
    });

    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Error connecting to MySQL database: ' + error.stack);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Call the async function to connect to the database
connectToDatabase();

//route with handlebars view
app.get('/', (req, res) => {
  const username = req.session.username || 'Guest';
  res.render('index', { title: 'My Express App', username });
});

// incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
