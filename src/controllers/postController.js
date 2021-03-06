const axios = require('axios');
const fs = require('fs');
const Path = require('path');
const debug = require('debug')('app:postController');
const showdown = require('showdown');
const downloadImage = require('../utils/utils');

const getOnePost = async (req, res) => {
  const converter = new showdown.Converter();
  const { postId } = req.params;
  let path;
  let response;
  let html;
  try {
    response = await axios.get(`/posts/${postId}`, {
      proxy: {
        host: 'blend_cms',
        port: 1337,
      },
    });

    path = Path.resolve(require.main.path, 'public', 'images', 'cover', response.data.cover.name);

    fs.access(path, fs.F_OK, async (err) => {
      if (err) {
        console.log('NO FILE FOUNDED');
        await downloadImage(response.data.cover.url, response.data.cover.name, 'cover');
      }
    });

    // content
    debug(`response: ${JSON.stringify(response.data)}`);
    html = converter.makeHtml(response.data.body);
    debug(`html: ${html}`);

    // cover
    const { cover } = response.data;
    debug(`url: ${cover.url}`);
    // TODO download image
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
  return res.render('pages/post', {
    title: response.data.title,
    id: req.params.postId,
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
