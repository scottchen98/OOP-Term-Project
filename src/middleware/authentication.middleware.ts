import { Request, Response, NextFunction } from "express";
import { PostService } from "../areas/post/services/Post.service";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/posts");
};

export const checkPostPrivilege = async (req: Request, res: Response, next: NextFunction) => {
  const postService = new PostService();
  const post = await postService.findById(Number(req.params.id));

  if (req.user) {
    if (req.user.id === post?.userId) {
      return next();
    } else if (req.user.following.includes(post!.userId)) {
      return next();
    }
  }
  res.redirect("/posts");
};
