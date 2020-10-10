const fs = require('fs');
const Path = require('path');
const axios = require('axios');

/**
 * Downloads an image from url and give it a name (imageName with extension)
 * @param {String} url
 * @param {String} imageName
 */
const downloadImage = async (url, imageName, type) => {
  const path = Path.resolve(require.main.path, 'public', 'images', type, imageName);
  const writter = fs.createWriteStream(path);

  const response = await axios.get(url, {
    proxy: {
      host: 'blend_cms',
      port: 1337,
    },
    responseType: 'stream',
  });

  response.data.pipe(writter);

  return new Promise((resolve, reject) => {
    writter.on('finish', resolve);
    writter.on('error', reject);
  });
};

module.exports = downloadImage;
