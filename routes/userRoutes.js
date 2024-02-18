const router = require("express").Router();

const {
  loginController,
  registerController,
  getLoginController,
  getBlogsController,
  postBlogsController,
  commentController,
  getCommentController,
} = require("../controller/userController");

router.post("/comment/:id",commentController)
router.get("/comment/:id",getCommentController)
router.get("/blogs/:id", getBlogsController);
router.post("/blogs", postBlogsController);
router.get("/login", getLoginController);
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
