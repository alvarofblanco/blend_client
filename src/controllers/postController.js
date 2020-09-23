const getOnePost = async (req, res) => {
  res.json({ message: 'ok' });
};

const postController = {};
postController.getOnePost = getOnePost;

module.exports = postController;
