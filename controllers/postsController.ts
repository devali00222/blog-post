import { Request, Response } from "express";
import Post from "../models/postsModel";
class PostsController {
  getAllPosts = async (req: Request, res: Response) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  createPost = async (req: Request, res: Response) => {
    const post = req.body;
    try {
      const newPost = await Post.create({
        title: post.title,
        content: post.content,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const edits = req.body;
    try {
      const newPost = await Post.findByIdAndUpdate(id, {
        title: edits.title,
        content: edits.content,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteAllPosts = async (req: Request, res: Response) => {
    try {
      await Post.deleteMany({});
      res.status(200).json({ result: "all posts deleted" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ result: "post deleted" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  unavilable = async (req: Request, res: Response) => {
    res.status(200).json({ result: `unavilable ${req.method}` });
  };
}
export default PostsController;
