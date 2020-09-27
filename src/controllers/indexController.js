// const axios = require('axios');
// const debug = require('debug')('app:indexController');

// const CONNECTION_STRING = 'blend_cms';

const getIndex = async (req, res) => {
  try {
    // const response = await axios('/posts', {
    //   method: 'GET',
    //   proxy: {
    //     host: CONNECTION_STRING,
    //     port: 1337,
    //   },
    // });
    res.render('pages/index', { title: 'Blend Blog' });
  } catch (error) {
    res.json({ error: error.toString() });
  }
};

const getAbout = async (req, res) => {
  try {
    return res.render('pages/about', { title: 'Blend Blol' })
  } catch (error) {
    res.json({ error: error.message })
  }
}

const indexController = {};
indexController.getIndex = getIndex;
indexController.getAbout = getAbout;

module.exports = indexController;
