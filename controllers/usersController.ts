import { Request, Response } from "express";
import User from "../models/usersModel";
class UsersController {
  login = async (req: Request, res: Response) => {
    const user = req.body;
    try {
      const data = await User.findOne({
        username: user.username,
      });
      data?.password === req.body.password
        ? res.status(200).json(data)
        : res.status(401).json({ result: "wrong pass" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  signUp = async (req: Request, res: Response) => {
    const user = req.body;
    try {
      const newUser = await User.create({
        username: user.username,
        password: user.password,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  edit = async (req: Request, res: Response) => {
    const edits = req.body;
    const id = req.params.id;
    try {
      const newUser = await User.findByIdAndUpdate(
        id,
        { password: edits.password },
        { new: true }
      );
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteAllUsers = async (req: Request, res: Response) => {
    try {
      await User.deleteMany({});
      res.status(201).json({ result: "all users deleted" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(201).json({ result: "User deleted" });
  };
  unavilable = async (req: Request, res: Response) => {
    res.status(401).json({ result: `${req.method} is unavilable` });
  };
}
export default UsersController;
