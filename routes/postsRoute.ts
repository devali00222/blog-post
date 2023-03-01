import { Router } from "express";
import PostsController from "../controllers/postsController";
const postsRouter = Router();
const controller = new PostsController();
postsRouter
  .route("/")
  .get(controller.getAllPosts)
  .post(controller.createPost)
  .put(controller.unavilable)
  .delete(controller.deleteAllPosts);
postsRouter
  .route("/:id")
  .get(controller.getPost)
  .post(controller.unavilable)
  .put(controller.updatePost)
  .delete(controller.deletePost);

export default postsRouter;
