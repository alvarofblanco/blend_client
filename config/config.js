require('dotenv').config();

const config = {
  development: {
    category: {
      musica: process.env.CATEGORIA_MUSICA,
      cultura: process.env.CATEGORIA_CULTURA,
      cine: process.env.CATEGORIA_CINE,
      gastronomia: process.env.CATEGORIA_GASTRONOMIA,
    },
  },
  production: {
    category: {
      musica: process.env.CATEGORIA_MUSICA,
      cultura: process.env.CATEGORIA_CULTURA,
      cine: process.env.CATEGORIA_CINE,
      gastronomia: process.env.CATEGORIA_GASTRONOMIA,
    },
  },
};

module.exports = config;
