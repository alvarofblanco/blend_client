const getOnePost = async (req, res) => {
  res.render('pages/post', { title: 'Titulo del Post', id: req.params.postId });
};

const postController = {};
postController.getOnePost = getOnePost;

module.exports = postController;
