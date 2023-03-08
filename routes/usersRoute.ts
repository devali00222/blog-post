import { Router } from "express";
import UsersController from "../controllers/usersController";
import {
  authentication,
  havePremision,
  isAdmin,
} from "../middlewares/authentication";
const usersRouter = Router();
const controller = new UsersController();
usersRouter
  .route("/")
  .get(authentication, havePremision, controller.getAllUsers)
  .post(controller.unavilable)
  .put(controller.unavilable)
  .delete(authentication, isAdmin, controller.deleteAllUsers);
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
  .route("/edit-password")
  .get(controller.unavilable)
  .post(authentication, controller.editPassword)
  .put(controller.unavilable)
  .delete(controller.unavilable);
usersRouter
  .route("/edit-role")
  .get(controller.unavilable)
  .post(authentication, havePremision, controller.editRole)
  .put(controller.unavilable)
  .delete(controller.unavilable);
usersRouter
  .route("/:id")
  .get(authentication, havePremision, controller.getUser)
  .post(controller.unavilable)
  .put(controller.unavilable)
  .delete(authentication, isAdmin, controller.deleteUser);
export default usersRouter;
