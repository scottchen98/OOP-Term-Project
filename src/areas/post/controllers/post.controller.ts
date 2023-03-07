import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { post, posts } from "../../../model/fakeDB";
import { MockPostService } from "../services/Post.service.mock";
import { ensureAuthenticated  } from "../../../middleware/authentication.middleware";

class PostController implements IController {
  public path = "/posts";
  public router = Router();

  constructor(postService: IPostService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // ensureAuthenticated needed
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, this.createComment);
    this.router.post(`${this.path}`, this.createPost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    const user = "billgates"; // need to change to current user
    // req.user?.username;
    const mock = new MockPostService();
    const posts = mock.sortByDate(mock.getAllPosts(user)); // need to change to current user
    res.render("post/views/posts", { posts: posts, getCommentsById: mock.getCommentsById, getUsernameById: mock.getUsernameById });
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response) => {
    // need next function
    
    const postId = Number(req.params.id);
    const mock = new MockPostService();
    const post = mock.findById(postId);
    if(post) {
      res.render("post/views/post", { post: post, getCommentsById: mock.getCommentsById, getUsernameById: mock.getUsernameById, sortByDate: mock.sortByDate });
    } else {
      res.status(404).send("wthhhhhhhh???!!!!")
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response) => {
    const mock = new MockPostService();
    const postId = Number(req.params.id);
    const userId = 1;
    // req.user?.userId;
    const message = req.body.commentText;
    mock.addCommentToPost(postId, userId, message);
    res.redirect('back')

  };
  private createPost = async (req: Request, res: Response) => {
    // next

    const currentUser = "billgates"; // need to change to current user
    const mock = new MockPostService();
    const postMessage = req.body.postText;
    mock.addPost(postMessage, currentUser);
    res.redirect("back")

  };
  private deletePost = async (req: Request, res: Response) => {
    // need next function

    const mock = new MockPostService();
    const deletePostId = Number(req.params.id);
    console.log("HELLOOOO: ", deletePostId)
    mock.deletePost(deletePostId);
    res.redirect("back")
  };

}

export default PostController;
