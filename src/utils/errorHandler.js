/* eslint-disable no-unused-vars */
const errorHandler = async (error, req, res, next) => {
  // express-validator errors
  if (Array.isArray(error.errors)) {
    res.status(400).json({
      error: {
        status: 400,
        message: error.errors,
      },
    });
    // other errors
  } else if (error.status === 404) {
    return res.status(404).render('errors/404');
  } else {
    return res.status(error.status || 500).render('errors/500', {
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
  }
};

module.exports = errorHandler;
