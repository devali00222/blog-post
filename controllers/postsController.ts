import { Request, Response } from "express";
class PostsController {
  getAllPosts = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  getPost = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  createPost = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  updatePost = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  deleteAllPosts = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  deletePost = async (req: Request, res: Response) => {
    res.status(200).json({ result: "getallposts" });
  };
  unavilable = async (req: Request, res: Response) => {
    res.status(200).json({ result: `unavilable ${req.method}` });
  };
}
export default PostsController;
