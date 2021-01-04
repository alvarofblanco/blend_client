/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-plusplus */
const axios = require('axios');
const debug = require('debug')('app:indexController');
const Path = require('path');
const fs = require('fs');
const showdown = require('showdown');
const downloadImage = require('../utils/utils');

// const CONNECTION_STRING = 'blend_cms';

const env = process.env.NODE_ENV;
const config = require('../../config/config')[env];

const createLlamada = (text, color) => `<p style="color: ${color};" class="llamada">${text}</p>`;

const getIndex = async (req, res, next) => {
  let responseCine;
  let responseGastronomia;
  let responseCultura;
  let responseMusica;
  const carrouselArr = [];
  let carrouselItem = {};
  let fecha;

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

    // console.log('responseCine: ', JSON.stringify(responseCine.data));
    // console.log('responseGastronomia: ', JSON.stringify(responseGastronomia.data));
    // console.log('responseCultura: ', JSON.stringify(responseCultura.data));
    // console.log('responseMusica: ', JSON.stringify(responseMusica.data));

    // CINE

    if (responseCine.data.length !== 0) {
      carrouselItem.id = responseCine.data[0]._id;
      carrouselItem.cover = `images/cover/${responseCine.data[0].cover.name}`;
      carrouselItem.title = responseCine.data[0].title;
      carrouselItem.copete = responseCine.data[0].copete;
      carrouselItem.autora = responseCine.data[0].user.displayName;
      carrouselItem.handle = responseCine.data[0].user.ig_handle;
      carrouselItem.title_id = responseCine.data[0].title_id;
      fecha = new Date(responseCine.data[0].createdAt);
      carrouselItem.fecha = fecha.toLocaleDateString('es-py');

      // push the items in the array
      carrouselArr.push(carrouselItem);
      carrouselItem = {};
    }

    // GASTRONOMIA

    if (responseGastronomia.data.length !== 0) {
      carrouselItem.id = responseGastronomia.data[0]._id;
      carrouselItem.cover = `images/cover/${responseGastronomia.data[0].cover.name}`;
      carrouselItem.title = responseGastronomia.data[0].title;
      carrouselItem.copete = responseGastronomia.data[0].copete;
      carrouselItem.autora = responseGastronomia.data[0].user.displayName;
      carrouselItem.handle = responseGastronomia.data[0].user.ig_handle;
      carrouselItem.title_id = responseGastronomia.data[0].title_id;
      fecha = new Date(responseGastronomia.data[0].createdAt);
      carrouselItem.fecha = fecha.toLocaleDateString('es-py');

      carrouselArr.push(carrouselItem);
      carrouselItem = {};
    }

    // CULTURA

    if (responseCultura.data.length !== 0) {
      carrouselItem.id = responseCultura.data[0]._id;
      carrouselItem.cover = `/images/cover/${responseCultura.data[0].cover.name}`;
      carrouselItem.title = responseCultura.data[0].title;
      carrouselItem.copete = responseCultura.data[0].copete;
      carrouselItem.autora = responseCultura.data[0].user.displayName;
      carrouselItem.handle = responseCultura.data[0].user.ig_handle;
      carrouselItem.title_id = responseCultura.data[0].title_id;
      fecha = new Date(responseCultura.data[0].createdAt);
      carrouselItem.fecha = fecha.toLocaleDateString('es-py');

      // push the item to the array
      carrouselArr.push(carrouselItem);
      carrouselItem = {};
    }

    // MUSICA

    if (responseMusica.data.length !== 0) {
      carrouselItem.id = responseMusica.data[0]._id;
      carrouselItem.cover = `/images/cover/${responseMusica.data[0].cover.name}`;
      carrouselItem.title = responseMusica.data[0].title;
      carrouselItem.copete = responseMusica.data[0].copete;
      carrouselItem.autora = responseMusica.data[0].user.displayName;
      carrouselItem.handle = responseMusica.data[0].user.ig_handle;
      carrouselItem.title_id = responseMusica.data[0].title_id;
      fecha = new Date(responseMusica.data[0].createdAt);
      carrouselItem.fecha = fecha.toLocaleDateString('es-py');

      carrouselArr.push(carrouselItem);
      carrouselItem = {};
    }

    debug(`carrousel: ${JSON.stringify(carrouselArr)}`);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  return res.render('pages/index', { title: 'Blend Blog', data: carrouselArr });
};

// const getAbout = async (req, res) => res.render('pages/about', { title: 'Blend Blog' });

const getAbout = async (req, res) => {
  const converter = new showdown.Converter();
  let path;
  let response;
  let about;
  let html = '';
  let richText;

  try {
    response = await axios.get('/abouts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
    });
    [about] = response.data;

    // console.log('about:', JSON.stringify(about));

    // Download cover image
    path = Path.resolve(require.main.path, 'public', 'images', 'cover', about.cover.name);

    fs.access(path, fs.F_OK, async (err) => {
      if (err) {
        // console.log('NO FILE FOUNDED');
        await downloadImage(about.cover.url, about.cover.name, 'images/cover');
      }
    });

    // content
    // debug(`response: ${JSON.stringify(about)}`);
    // html = converter.makeHtml(about.body);
    richText = about.richText;
    // debug(`html: ${JSON.stringify(richText)}`);
    // loop through richText array
    for (let i = 0; i < richText.length; i++) {
      if (richText[i].texto !== undefined) {
        html += converter.makeHtml(richText[i].texto);
      }
      if (richText[i].llamada !== undefined) {
        html += createLlamada(richText[i].llamada, about.category.color);
      }
    }

    // debug(`html: ${html}`);

    // download text images
    for (let i = 0; i < about.textImage.length; i++) {
      // builds the path of the images public/uploads/[images_name]
      path = Path.resolve(require.main.path, 'public', 'uploads', about.text_image[i].text_image.hash);
      debug(`path: ${path}`);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(about.text_image[i].text_image.formats.medium.url, about.text_image[i].text_image.hash + about.text_image[i].text_image.ext, 'uploads');
        }
      });
    }

    // cover
    const { cover } = about;
    debug(`url: ${cover.url}`);
    // TODO download image
  } catch (error) {
    // console.error(error);
    return res.send(error);
  }
  const date = new Date(about.createdAt);
  return res.render('pages/about2', {
    title: about.title,
    id: req.params.postId,
    copete: about.copete,
    date: date.toLocaleDateString('en-es'),
    data: html,
    color: about.category.color,
    cover: `/images/cover/${about.cover.name}`,
  });
};

const indexController = {};
indexController.getIndex = getIndex;
indexController.getAbout = getAbout;

module.exports = indexController;
