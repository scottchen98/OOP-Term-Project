import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../services/IPostService";
import { checkPostPrivilege, ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { PostViewModel } from "../views/post.viewmodel";
import { MockPostService } from "../services";

class PostController implements IController {
  public path = "/posts";
  public router = Router();
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.initializeRoutes();
    this.postService = postService;
  }

  private initializeRoutes() {
    this.router.get(this.path, ensureAuthenticated, this.getAllPosts);
    this.router.get(`${this.path}/:id`, ensureAuthenticated, this.getPostById);
    this.router.get(`${this.path}/:id/delete`, ensureAuthenticated, checkPostPrivilege, this.deletePost);
    this.router.post(`${this.path}/:id/comment`, ensureAuthenticated, this.createComment);
    this.router.post(`${this.path}`, ensureAuthenticated, this.createPost);
    this.router.get(`${this.path}/like/:id`, ensureAuthenticated, this.likePost);
  }

  // Done ✅ NEED req.user
  private getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    // const mock = new MockPostService();
    // mock.getAllPosts();
    if (req.user) {
      const user = req.user.username;
      const allPosts = await this.postService.getAllPosts(user);
      res.locals.currentUserFirstName = req.user.firstName;
      res.locals.currentUserLastName = req.user.lastName;
      res.locals.currentUserEmail = req.user.email;

      const allUsernames = await this.postService.getUsernamesOfCommentsOrPosts(allPosts);

      // get number of comments for each post
      const eachPostCommentLength = allPosts.map((post) => post.commentList.length);

      res.render("post/views/posts", {
        posts: allPosts,
        allUsernames: allUsernames,
        eachPostCommentLength: eachPostCommentLength,
      });
    }
  };

  // Done ✅
  private getPostById = async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    const post = await this.postService.findById(postId);

    const postUsername = await this.postService.getUsernameById(post!.userId);
    const allComments = await this.postService.getCommentsById(post!.postId);

    const allCommentsUsernames = await this.postService.getUsernamesOfCommentsOrPosts(allComments);

    if (post) {
      res.render("post/views/post", {
        post: post,
        allComments: allComments,
        allCommentsUsernames: allCommentsUsernames,
        postUsername: postUsername,
      });
    } else {
      res.status(404).send("wthhhhhhhh???!!!!");
    }
  };

  // Done ✅ NEED req.user
  private createComment = async (req: Request, res: Response) => {
    const postId = Number(req.params.id);
    if (req.user) {
      const userId = req.user.id;
      const message = req.body.commentText;
      this.postService.addCommentToPost(postId, userId, message);
      res.redirect("back");
    }
  };

  // Done ✅ NEED req.user
  private createPost = async (req: Request, res: Response) => {
    if (req.user) {
      const currentUserId = Number(req.user.id);
      const postMessage = req.body.postText;
      this.postService.addPost(postMessage, currentUserId);
      res.redirect("back");
    }
  };

  // Done ✅
  private deletePost = async (req: Request, res: Response) => {
    const deletePostId = Number(req.params.id);
    this.postService.deletePost(deletePostId);
    res.redirect("back");
  };

  // Done ✅ NEED req.user
  private likePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    if (req.user) {
      const currentUserId = req.user.id;

      this.postService.likePost(Number(postId), currentUserId);
      res.redirect("/posts");
    }
  };
}

export default PostController;
