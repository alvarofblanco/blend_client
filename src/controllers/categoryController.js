const getPostMusica = (req, res) => {
  res.render('pages/category', { title: 'musica' });
};

const getPostCine = (req, res) => {
  res.render('pages/category', { title: 'cine & series' });
};

const getPostGastronomia = (req, res) => {
  res.render('pages/category', { title: 'gastronomia' });
};

const getPostCultura = (req, res) => {
  res.render('pages/category', { title: 'cultura' });
};

const categoryController = {};
categoryController.getPostMusica = getPostMusica;
categoryController.getPostCine = getPostCine;
categoryController.getPostGastronomia = getPostGastronomia;
categoryController.getPostCultura = getPostCultura;

module.exports = categoryController;
