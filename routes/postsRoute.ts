import { Router } from "express";
import PostsController from "../controllers/postsController";
import { authentication } from "../middlewares/authentication";
const postsRouter = Router();
const controller = new PostsController();
postsRouter
  .route("/")
  .get(authentication, controller.getAllPosts)
  .post(authentication, controller.createPost)
  .put(controller.unavilable)
  .delete(authentication, controller.deleteAllPosts);
postsRouter
  .route("/:id")
  .get(authentication, controller.getPost)
  .post(controller.unavilable)
  .put(authentication, controller.updatePost)
  .delete(authentication, controller.deletePost);

export default postsRouter;
