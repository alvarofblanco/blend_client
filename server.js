const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:server');
require('dotenv').config();

const indexRouter = require('./src/routes/indexRouter');

const PORT = process.env.PORT || 3000;

const app = express();

// Logger
app.use(morgan('tiny'));

// Set the static files directory
app.use(express.static('public'));
// app.use(express.static(__dirname, '/public'));

// view engine
app.set('views', 'public/views');
app.set('view engine', 'ejs');

// App routes
app.use('/', indexRouter);

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
