const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const ticketRoutes = require ('./routes/api/ticketRoutes')
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//handlebars as the view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//express-session
app.use(session({
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: true
}));

//mysql database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || ''
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

//route with handlebars view
app.get('/', (req, res) => {
  const username = req.session.username || 'Guest';
  res.render('index', { title: 'My Express App', username });
});

app.use('/api/ticket', ticketRoutes);

// incoming requests
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Inform Express.js which template engine we're using
app.engine('handlebars', hbs.engine);
