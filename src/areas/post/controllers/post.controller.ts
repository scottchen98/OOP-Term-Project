import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { MockPostService } from "../services/Post.service.mock";
import { checkPostPrivilege, ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { PostViewModel } from "../views/post.viewmodel";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

import IComment from "../../../interfaces/comment.interface";
import { Express } from "express";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    // ensureAuthenticated needed
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, checkPostPrivilege, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, ensureAuthenticated, checkPostPrivilege, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, ensureAuthenticated, this.createComment);
    this.router.post(`${this.path}`, ensureAuthenticated, this.createPost);
    this.router.get(`${this.path}/like/:id`, ensureAuthenticated, this.likePost);
  }

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary posts object
  private getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const user = req.user.username;
      const mock = new MockPostService();
      const posts = mock.sortByDate(mock.getAllPosts(user));

      res.locals.currentUserFirstName = req.user.firstName;
      res.locals.currentUserLastName = req.user.lastName;
      res.locals.currentUserEmail = req.user.email;

      // format posts data
      const formattedPost = posts.map((post: IPost | IComment) => {
        if ("commentList" in post) {
          return new PostViewModel(post).post;
        }
      });

      res.render("post/views/posts", {
        posts: formattedPost,
        getCommentsById: mock.getCommentsById,
        getUsernameById: mock.getUsernameById,
      });
    }
  };

  // 🚀 This method should use your postService and pull from your actual fakeDB, not the temporary post object
  private getPostById = async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const mock = new MockPostService();
    const post = mock.findById(postId);
    if (post) {
      res.render("post/views/post", {
        post: post,
        getCommentsById: mock.getCommentsById,
        getUsernameById: mock.getUsernameById,
        sortByDate: mock.sortByDate,
      });
    } else {
      res.status(404).send("wthhhhhhhh???!!!!");
    }
  };

  // 🚀 These post methods needs to be implemented by you
  private createComment = async (req: Request, res: Response) => {
    if (req.user) {
      const mock = new MockPostService();
      const postId = Number(req.params.id);
      const userId = req.user.id;
      const message = req.body.commentText;
      mock.addCommentToPost(postId, userId, message);
      res.redirect("back");
    }
  };
  private createPost = async (req: Request, res: Response) => {
    if (req.user) {
      const currentUser = req.user.username; // need to change to current user
      const mock = new MockPostService();
      const postMessage = req.body.postText;
      mock.addPost(postMessage, currentUser);
      res.redirect("back");
    }
  };
  private deletePost = async (req: Request, res: Response) => {
    const mock = new MockPostService();
    const deletePostId = Number(req.params.id);
    mock.deletePost(deletePostId);
    res.redirect("back");
  };

  private likePost = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const postId = req.params.id;
      let username = req.user.username;
      const mock = new MockPostService();
      let user = mock.findByUsername(username);

      if (user) {
        const postLiked = mock.findById(Number(postId));
        mock.likePost(Number(postId), user.id, postLiked);
        res.redirect("/posts");
      }
    }
  };
}

export default PostController;
