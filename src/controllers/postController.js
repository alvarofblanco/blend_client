const axios = require('axios');
const debug = require('debug')('app:postController');
const showdown = require('showdown');

const getOnePost = async (req, res) => {
  const converter = new showdown.Converter();
  let response;
  let html; let
    coverUrl;
  try {
    response = await axios.get('/posts/5f7a421e267897003820bb85', {
      proxy: {
        host: 'blend_cms_dev',
        port: 1337,
      },
    });
    // content
    debug(`response: ${JSON.stringify(response.data)}`);
    html = converter.makeHtml(response.data.body);
    debug(`html: ${html}`);

    // cover
    const { cover } = response.data;
    debug(`url: ${cover.url}`);
    // todo download image
    coverUrl = new URL(`http://localhost:1337${cover.url}`);
  } catch (error) {
    res.send(error);
  }
  res.render('pages/post', {
    title: 'Titulo del Post', id: req.params.postId, data: html, cover: coverUrl.href,
  });
};

const postController = {};
postController.getOnePost = getOnePost;

module.exports = postController;
