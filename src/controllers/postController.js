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

const getOnePost = async (req, res, next) => {
  const converter = new showdown.Converter();
  const { postTitleId } = req.params;
  let path;
  let response;
  let html = '';
  let richText;
  let post;

  try {
    response = await axios.get('/posts', {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
      params: {
        title_id: postTitleId,
      },
    });

    // if post not found
    // console.log('response: ', JSON.stringify(response.data));
    if (response.data.length === 0) {
      const error = new Error('Not Found');
      error.status = 404;
      return next(error);
    }
    [post] = response.data;

    debug(`response: ${JSON.stringify(post)}`);
    // Download cover image
    path = Path.resolve(require.main.path, 'public', 'images', 'cover', post.cover.name);

    fs.access(path, fs.F_OK, async (err) => {
      if (err) {
        console.log('NO FILE FOUNDED');
        await downloadImage(post.cover.url, post.cover.name, 'images/cover');
      }
    });

    // content
    // debug(`response: ${JSON.stringify(post)}`);
    // html = converter.makeHtml(post.body);
    richText = post.richText;
    // debug(`html: ${JSON.stringify(richText)}`);
    // loop through richText array
    for (let i = 0; i < richText.length; i++) {
      if (richText[i].texto !== undefined) {
        html += converter.makeHtml(richText[i].texto);
      }
      if (richText[i].llamada !== undefined) {
        html += createLlamada(richText[i].llamada, post.category.color);
      }
    }

    debug(`html: ${html}`);

    // download text images
    for (let i = 0; i < post.text_image.length; i++) {
      // builds the path of the images public/uploads/[images_name]
      path = Path.resolve(require.main.path, 'public', 'uploads', post.text_image[i].text_image.hash);
      debug(`path: ${path}`);

      fs.access(path, fs.F_OK, async (err) => {
        if (err) {
          // download the image if not founded in the server
          await downloadImage(post.text_image[i].text_image.formats.medium.url, post.text_image[i].text_image.hash + post.text_image[i].text_image.ext, 'uploads');
        }
      });
    }

    // cover
    const { cover } = post;
    debug(`url: ${cover.url}`);
    // TODO download image
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
  const date = new Date(post.createdAt);
  return res.render('pages/post', {
    title: post.title,
    id: req.params.postId,
    copete: post.copete,
    autora: post.user.displayName,
    handle: post.user.ig_handle,
    hashtags: post.hashtags,
    date: date.toLocaleDateString('en-es'),
    data: html,
    color: post.category.color,
    cover: `/images/cover/${post.cover.name}`,
  });
};

const getOnePostLorem = async (req, res) => {
  res.render('pages/postLorem', { title: 'Titulo del Post', id: req.params.postId });
};

const postController = {};
postController.getOnePost = getOnePost;
postController.getOnePostLorem = getOnePostLorem;

module.exports = postController;
