import { Request, Response, NextFunction } from "express";
import { MockPostService } from "../areas/post/services/Post.service.mock";

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

export const checkPostPrivilege = (req: Request, res: Response, next: NextFunction) => {
  const mock = new MockPostService();
  const post = mock.findById(Number(req.params.id));

  if (req.user) {
    if (req.user.id === post.userId) {
      return next();
    } else if (req.user.following.includes(post.userId)) {
      return next();
    }
  }
  res.redirect("/posts");
};
