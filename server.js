const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server');
// const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// const routes = require('./src/routes/index');

const PORT = process.env.PORT || 3000;

const app = express();

// Logger
app.use(morgan('tiny'));

// Set the static files directory
app.use(express.static('public'));
// app.use(express.static(__dirname, '/public'));

// view engine
app.set('views', 'src/views');
app.set('view engine', 'ejs');

// App routes
// app.use('/', routes);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Blend Blog',
  });
});

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
