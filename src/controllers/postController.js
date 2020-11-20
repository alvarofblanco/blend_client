/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// TODO add error login
const axios = require('axios');
const fs = require('fs');
const Path = require('path');
const debug = require('debug')('app:postController');
const showdown = require('showdown');
const downloadImage = require('../utils/utils');

const createLlamada = (text, color) => `<p style="color: ${color};" class="llamada">${text}</p>`;

const getOnePost = async (req, res) => {
  const converter = new showdown.Converter();
  const { postId } = req.params;
  let path;
  let response;
  let html = '';
  let richText;

  try {
    response = await axios.get(`/posts/${postId}`, {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
    });

    // Download cover image
    path = Path.resolve(require.main.path, 'public', 'images', 'cover', response.data.cover.name);

    fs.access(path, fs.F_OK, async (err) => {
      if (err) {
        console.log('NO FILE FOUNDED');
        await downloadImage(response.data.cover.url, response.data.cover.name, 'images/cover');
      }
    });

    // content
    // debug(`response: ${JSON.stringify(response.data)}`);
    // html = converter.makeHtml(response.data.body);
    richText = response.data.richText;
    // debug(`html: ${JSON.stringify(richText)}`);
    // loop through richText array
    for (let i = 0; i < richText.length; i++) {
      if (richText[i].texto !== undefined) {
        html += converter.makeHtml(richText[i].texto);
      }
      if (richText[i].llamada !== undefined) {
        html += createLlamada(richText[i].llamada, response.data.category.color);
      }
    }

    debug(`html: ${html}`);

    // download text images
    for (let i = 0; i < response.data.text_image.length; i++) {
      // builds the path of the images public/uploads/[images_name]
      path = Path.resolve(require.main.path, 'public', 'uploads', response.data.text_image[i].text_image.hash);
      debug(`path: ${path}`);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(response.data.text_image[i].text_image.formats.medium.url, response.data.text_image[i].text_image.hash + response.data.text_image[i].text_image.ext, 'uploads');
        }
      });
    }

    // cover
    const { cover } = response.data;
    debug(`url: ${cover.url}`);
    // TODO download image
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
  const date = new Date(response.data.createdAt);
  return res.render('pages/post', {
    title: response.data.title,
    id: req.params.postId,
    copete: response.data.copete,
    autora: response.data.user.displayName,
    handle: response.data.user.ig_handle,
    hashtags: response.data.hashtags,
    date: date.toLocaleDateString('en-es'),
    data: html,
    color: response.data.category.color,
    cover: `/images/cover/${response.data.cover.name}`,
  });
};

const getOnePostLorem = async (req, res) => {
  res.render('pages/postLorem', { title: 'Titulo del Post', id: req.params.postId });
};

const postController = {};
postController.getOnePost = getOnePost;
postController.getOnePostLorem = getOnePostLorem;

module.exports = postController;
