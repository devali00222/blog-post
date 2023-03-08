import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication";
import Post from "../models/postsModel";
class PostsController {
  getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  getPost = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  createPost = async (req: AuthenticatedRequest, res: Response) => {
    const post = req.body;
    try {
      const newPost = await Post.create({
        title: post.title,
        content: post.content,
        autherId: req.user.id,
        autherName: req.user.username,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  updatePost = async (req: AuthenticatedRequest, res: Response) => {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
      const post = await Post.findById(id);
      if (post?.autherId === req.user?.id) {
      post!.title = title || post?.title
      post!.content = content || post?.content
      post!.date = new Date()
      }
      await post?.save()
      res.status(200).json(post);
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deleteAllPosts = async (req: AuthenticatedRequest, res: Response) => {
    try {
      await Post.deleteMany({});
      res.status(200).json({ result: "all posts deleted" });
    } catch (err) {
      res.status(401).json(err);
    }
  };
  deletePost = async (req: AuthenticatedRequest, res: Response) => {
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
