const express = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = express.Router();

indexRouter.route('/').get(indexController.getIndex);
indexRouter.route('/testing').get(indexController.getTesting);

module.exports = indexRouter;
