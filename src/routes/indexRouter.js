const express = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = express.Router();

indexRouter.route('/').get(indexController.getIndex);
indexRouter.route('/about').get(indexController.getAbout);

module.exports = indexRouter;
