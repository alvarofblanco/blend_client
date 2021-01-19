require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const serveFavicon = require('serve-favicon');
const path = require('path');
const debug = require('debug')('app:server');

const categoryRouter = require('./src/routes/category');
const indexRouter = require('./src/routes/indexRouter');
const postRouter = require('./src/routes/postRouter');

const errorHandler = require('./src/utils/errorHandler');

const PORT = process.env.PORT || 3333;

const app = express();

// favicon caching
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));

// Logger
app.use(morgan('tiny'));
app.use(helmet());

// Set the static files directory
app.use(express.static('public'));
// app.use(express.static(__dirname, '/public'));

// view engine
app.set('views', 'public/views');
app.set('view engine', 'ejs');

// App routes
app.use('/', indexRouter);
app.use('/post', postRouter);
app.use('/category', categoryRouter);

// 404 error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
