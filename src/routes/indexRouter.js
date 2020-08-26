const express = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = express.Router();

indexRouter.route('/').get(indexController.getIndex);
indexRouter.route('/collapsible').get(indexController.getCollapsible);

module.exports = indexRouter;
