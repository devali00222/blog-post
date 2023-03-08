import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usersModel";
import { AuthenticatedRequest } from "../middlewares/authentication";
class UsersController {
  login = async (req: AuthenticatedRequest, res: Response) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        username: username,
      });
      if (!user) {
        return res.status(401).json({ result: "invalid" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ result: "invalid" });
      }
      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY || "12345-67890-09876-54321"
      );
      res.status(200).json(token);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  signUp = async (req: AuthenticatedRequest, res: Response) => {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
      });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  editPassword = async (req: AuthenticatedRequest, res: Response) => {
    const edits = req.body;
    try {
      const newUser = await User.findByIdAndUpdate(
        req.user.id,
        { password: edits.password },
        { new: true }
      );
      res.status(201).json();
    } catch (err) {
      res.status(401).json(err);
    }
  };
  editRole = async (req: AuthenticatedRequest, res: Response) => {
    const edits = req.body;
    try {
      const newUser = await User.findByIdAndUpdate(
        req.user.id,
        { role: edits.role },
        { new: true }
      );
      res.status(201).json(newUser);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
      console.log(req.user);
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getUser = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
      await User.deleteMany({});
      res.status(201).json({ result: "all users deleted" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(201).json({ result: "User deleted" });
  };
  unavilable = async (req: AuthenticatedRequest, res: Response) => {
    res.status(401).json({ result: `${req.method} is unavilable` });
  };
}
export default UsersController;
