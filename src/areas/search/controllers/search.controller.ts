import express from "express";
import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import { database as db } from "../../../model/fakeDB";
import { MockPostService } from "../../post/services/Post.service.mock";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";
import { SearchPostViewModel } from "../views/searchPostViewModel";
import { SearchUserViewModel } from "../views/searchUserViewModel";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import ISearchService from "../../search/services/ISearchService";

class SearchController implements IController {
  public path = "/search";
  public router = express.Router();
  private service: ISearchService;

  constructor(service: ISearchService) {
    this.initializeRoutes();
    this.service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.search);
    this.router.post(`${this.path}/follow`, this.changeFollow);
  }

  private search = async (req: Request, res: Response) => {
    if (req.user) {
      const currentUser = req.user.username;
      const searchFor = String(req.query.query);
      const resultUsers = await this.service.searchUsers(searchFor);
      const resultPosts = await this.service.searchPosts(searchFor);

      // format resultUsers and resultPosts
      const formattedUsers = resultUsers.map((user) => new SearchUserViewModel(user).resultUser);
      const formattedPosts = resultPosts.map((post) => new SearchPostViewModel(post).resultPost);

      // get username for each result post
      const allUsernamesFromResultPosts = await this.service.getAllUsernames(formattedPosts);
      console.log("ALLUSERNAMES", allUsernamesFromResultPosts);

      // get current following users from current logged-in user
      const currentFollowing = await this.service.getCurrentFollowingUsers(currentUser);
      const checkFollowing = await this.service.checkFollowing(formattedUsers, currentFollowing);

      console.log("CHECKFOLLOWING", checkFollowing);

      res.render("search/views/search", {
        formattedUsers: formattedUsers,
        formattedPosts: formattedPosts,
        allUsernamesFromResultPosts,
        checkFollowing,
        currentUser: currentUser,
      });
    }
  };

  private changeFollow = async (req: Request, res: Response) => {
    if (req.user && req.query.userId) {
      const currentUserId = req.user.id;
      const followingUserId = +req.query.userId;

      const currentUser = await this.service.getCurrentUser(currentUserId);
      const isFollowing = currentUser?.following.filter((followingUser) => followingUser.id === followingUserId);

      if (isFollowing && isFollowing.length === 0) {
        await this.service.followUser(currentUserId, followingUserId);
      } else {
        await this.service.unfollowUser(currentUserId, followingUserId);
      }
      res.redirect("back");
    }
  };
}
export default SearchController;
