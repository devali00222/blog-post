import { Router } from "express";
import UsersController from "../controllers/usersController";
const usersRouter = Router();
const controller = new UsersController();
usersRouter
  .route("/")
  .get(controller.getAllUsers)
  .post(controller.unavilable)
  .put(controller.unavilable)
  .delete(controller.deleteAllUsers);
usersRouter
  .route("/login")
  .get(controller.unavilable)
  .post(controller.login)
  .put(controller.unavilable)
  .delete(controller.unavilable);
usersRouter
  .route("/signup")
  .get(controller.unavilable)
  .post(controller.signUp)
  .put(controller.unavilable)
  .delete(controller.unavilable);
usersRouter
  .route("/edit")
  .get(controller.unavilable)
  .post(controller.edit)
  .put(controller.unavilable)
  .delete(controller.unavilable);
usersRouter
  .route("/:id")
  .get(controller.getUser)
  .post(controller.unavilable)
  .put(controller.unavilable)
  .delete(controller.deleteUser);
export default usersRouter;
