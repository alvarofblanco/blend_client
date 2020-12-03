const express = require('express');

const postRouter = express.Router();
const postController = require('../controllers/postController');

// postRouter.route('/lorem').get(postController.getOnePostLorem);
postRouter.route('/:postTitleId').get(postController.getOnePost);

module.exports = postRouter;
