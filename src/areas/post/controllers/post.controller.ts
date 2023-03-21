import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { database } from "../../../model/fakeDB";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
    this.router.get(`${this.path}/like/:id`, this.likePost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response) => {
    let username = req.user.username
    let user = this.postService.findByUsername(username)
    let posts = this.postService.getAllPosts(user.id)
    res.render("post/views/posts", { posts: posts, likes: database.liked});
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (request: Request, res: Response, next: NextFunction) => {
    res.render("post/views/post", { post:database.posts });
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response, next: NextFunction) => {};
  private createPost = async (req: Request, res: Response, next: NextFunction) => {};
  private deletePost = async (req: Request, res: Response, next: NextFunction) => {};
  
  private likePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id
    let username = req.user.username
    let user = this.postService.findByUsername(username)
    let postLiked = null
    for( const post of database.posts) {
      if( post.postId == Number(postId)) {
        postLiked = post
      }
    }

    this.postService.likePost(Number(postId), user.id, postLiked)
    res.redirect("/posts")

  };

}

export default PostController;
