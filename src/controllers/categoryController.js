const getPostMusica = (req, res) => {
  res.send('musica');
};

const getPostCine = (req, res) => {
  res.send('cine');
};

const getPostGastronomia = (req, res) => {
  res.send('gastronomia');
};

const getPostCultura = (req, res) => {
  res.send('cultura');
};

const categoryController = {};
categoryController.getPostMusica = getPostMusica;
categoryController.getPostCine = getPostCine;
categoryController.getPostGastronomia = getPostGastronomia;
categoryController.getPostCultura = getPostCultura;

module.exports = categoryController;
