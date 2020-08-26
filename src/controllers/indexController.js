const getIndex = (req, res) => {
  res.render('index', { title: 'Blend Blog' });
};

const indexController = {};
indexController.getIndex = getIndex;

module.exports = indexController;
