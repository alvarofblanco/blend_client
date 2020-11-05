/* eslint-disable no-plusplus */
require('dotenv').config();
const axios = require('axios');
const Path = require('path');
const fs = require('fs');
const debug = require('debug')('app:categoryController');
const downloadImage = require('../utils/utils');

const env = process.env.NODE_ENV;
const config = require('../../config/config')[env];

const getPostMusica = async (req, res) => {
  let response;
  let path;
  // cover es un array de strings que contiene los path de las imagenes de los cards
  const cover = [];
  try {
    response = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.musica,
        active: true,
      },
    });

    debug(`response: ${JSON.stringify(response.data)}`);

    // look for the picture in the server
    for (let i = 0; i < response.data.length; i++) {
      // builds the path of the images public/images/card/[images_name]
      path = Path.resolve(require.main.path, 'public', 'images', 'card', response.data[i].cover.name);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(response.data[i].cover.formats.medium.url, response.data[i].cover.name, 'card');
        }
      });

      // add path to cover
      cover.push(`/images/card/${response.data[i].cover.name}`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/');
  }
  return res.render('pages/category', { title: 'musica', data: response.data, cover });
};

const getPostCine = async (req, res) => {
  let response;
  let path;
  // cover es un array de strings que contiene los path de las imagenes de los cards
  const cover = [];
  try {
    response = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.cine,
        active: true,
      },
    });

    // look for the picture in the server
    for (let i = 0; i < response.data.length; i++) {
      // builds the path of the images public/images/card/[images_name]
      path = Path.resolve(require.main.path, 'public', 'images', 'card', response.data[i].cover.name);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(response.data[i].cover.formats.medium.url, response.data[i].cover.name, 'card');
        }
      });

      // add path to cover
      cover.push(`/images/card/${response.data[i].cover.name}`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/');
  }
  return res.render('pages/category', { title: 'cine&series', data: response.data, cover });
};

const getPostGastronomia = async (req, res) => {
  let response;
  let path;
  // cover es un array de strings que contiene los path de las imagenes de los cards
  const cover = [];
  try {
    response = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.gastronomia,
        active: true,
      },
    });

    // look for the picture in the server
    for (let i = 0; i < response.data.length; i++) {
      // builds the path of the images public/images/card/[images_name]
      path = Path.resolve(require.main.path, 'public', 'images', 'card', response.data[i].cover.name);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(response.data[i].cover.formats.medium.url, response.data[i].cover.name, 'card');
        }
      });

      // add path to cover
      cover.push(`/images/card/${response.data[i].cover.name}`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/');
  }
  return res.render('pages/category', { title: 'cine&series', data: response.data, cover });
};

const getPostCultura = async (req, res) => {
  let response;
  let path;
  // cover es un array de strings que contiene los path de las imagenes de los cards
  const cover = [];
  try {
    response = await axios('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        category: config.category.cultura,
        active: true,
      },
    });

    // look for the picture in the server
    for (let i = 0; i < response.data.length; i++) {
      // builds the path of the images public/images/card/[images_name]
      path = Path.resolve(require.main.path, 'public', 'images', 'card', response.data[i].cover.name);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(response.data[i].cover.formats.medium.url, response.data[i].cover.name, 'card');
        }
      });

      // add path to cover
      cover.push(`/images/card/${response.data[i].cover.name}`);
    }
  } catch (error) {
    console.error(error);
    return res.redirect('/');
  }
  return res.render('pages/category', { title: 'cine&series', data: response.data, cover });
};

const categoryController = {};
categoryController.getPostMusica = getPostMusica;
categoryController.getPostCine = getPostCine;
categoryController.getPostGastronomia = getPostGastronomia;
categoryController.getPostCultura = getPostCultura;

module.exports = categoryController;
