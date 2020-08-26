const getIndex = (req, res) => {
  res.render('pages/index', { title: 'Blend Blog' });
};

const getCollapsible = (req, res) => {
  res.render('pages/index', { title: 'Collapsible' });
};

const indexController = {};
indexController.getIndex = getIndex;
indexController.getCollapsible = getCollapsible;

module.exports = indexController;
