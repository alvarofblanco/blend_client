/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
const axios = require('axios');
const debug = require('debug')('app:indexController');

// const CONNECTION_STRING = 'blend_cms';

const env = process.env.NODE_ENV;
const config = require('../../config/config')[env];

const getIndex = async (req, res) => {
  let responseCine;
  let responseGastronomia;
  let responseCultura;
  let responseMusica;
  const carrouselArr = [];
  let carrouselItem = {};

  try {
    // const response = await axios('/posts', {
    //   method: 'GET',
    //   proxy: {
    //     host: CONNECTION_STRING,
    //     port: 1337,
    //   },
    // });

    responseCine = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.cine,
        active: true,
        _sort: 'createdAt:DESC',
        _limit: 1,
      },
    });

    responseGastronomia = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.gastronomia,
        active: true,
        _sort: 'createdAt:DESC',
        _limit: 1,
      },
    });

    responseCultura = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.cultura,
        active: true,
        _sort: 'createdAt:DESC',
        _limit: 1,
      },
    });

    responseMusica = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.musica,
        active: true,
        _sort: 'createdAt:DESC',
        _limit: 1,
      },
    });

    debug(`cine: ${JSON.stringify(responseCine.data)}`);
    carrouselItem.id = responseCine.data[0]._id;
    carrouselItem.cover = `images/cover/${responseCine.data[0].cover.name}`;
    carrouselItem.title = responseCine.data[0].title;
    carrouselItem.copete = responseCine.data[0].copete;
    carrouselItem.autora = responseCine.data[0].user.displayName;
    carrouselItem.handle = responseCine.data[0].user.ig_handle;
    let fecha = new Date(responseCine.data[0].createdAt);
    carrouselItem.fecha = fecha.toLocaleDateString('es-py');

    carrouselArr.push(carrouselItem);
    carrouselItem = {};

    debug(`gastronomia: ${JSON.stringify(responseGastronomia.data)}`);
    carrouselItem.id = responseGastronomia.data[0]._id;
    carrouselItem.cover = `images/cover/${responseGastronomia.data[0].cover.name}`;
    carrouselItem.title = responseGastronomia.data[0].title;
    carrouselItem.copete = responseGastronomia.data[0].copete;
    carrouselItem.autora = responseGastronomia.data[0].user.displayName;
    carrouselItem.handle = responseGastronomia.data[0].user.ig_handle;
    fecha = new Date(responseGastronomia.data[0].createdAt);
    carrouselItem.fecha = fecha.toLocaleDateString('es-py');

    carrouselArr.push(carrouselItem);
    carrouselItem = {};

    debug(`cultura: ${JSON.stringify(responseCultura.data)}`);
    carrouselItem.id = responseCultura.data[0]._id;
    carrouselItem.cover = `/images/cover/${responseCultura.data[0].cover.name}`;
    carrouselItem.title = responseCultura.data[0].title;
    carrouselItem.copete = responseCultura.data[0].copete;
    carrouselItem.autora = responseCultura.data[0].user.displayName;
    carrouselItem.handle = responseCultura.data[0].user.ig_handle;
    fecha = new Date(responseCultura.data[0].createdAt);
    carrouselItem.fecha = fecha.toLocaleDateString('es-py');

    carrouselArr.push(carrouselItem);
    carrouselItem = {};

    debug(`musica: ${JSON.stringify(responseMusica.data)}`);
    carrouselItem.id = responseMusica.data[0]._id;
    carrouselItem.cover = `/images/cover/${responseMusica.data[0].cover.name}`;
    carrouselItem.title = responseMusica.data[0].title;
    carrouselItem.copete = responseMusica.data[0].copete;
    carrouselItem.autora = responseMusica.data[0].user.displayName;
    carrouselItem.handle = responseMusica.data[0].user.ig_handle;
    fecha = new Date(responseMusica.data[0].createdAt);
    carrouselItem.fecha = fecha.toLocaleDateString('es-py');

    carrouselArr.push(carrouselItem);
    carrouselItem = {};

    res.render('pages/index', { title: 'Blend Blog', data: carrouselArr });
  } catch (error) {
    res.json({ error: error.toString() });
  }
};

const getAbout = async (req, res) => res.render('pages/about', { title: 'Blend Blog' });

const indexController = {};
indexController.getIndex = getIndex;
indexController.getAbout = getAbout;

module.exports = indexController;
