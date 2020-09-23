const express = require('express');

const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.route('/cine').get(categoryController.getPostCine);
categoryRouter.route('/gastronomia').get(categoryController.getPostGastronomia);
categoryRouter.route('/cultura').get(categoryController.getPostCultura);
categoryRouter.route('/musica').get(categoryController.getPostMusica);

module.exports = categoryRouter;
