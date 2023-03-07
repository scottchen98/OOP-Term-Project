import express from "express";
import { Request, Response, NextFunction, Router } from "express";
import IController from "../../../interfaces/controller.interface";
import IPostService from "../../post/services/IPostService";
import { database as db } from "../../../model/fakeDB";
import { MockPostService } from "../../post/services/Post.service.mock";
import { ensureAuthenticated } from "../../../middleware/authentication.middleware";

class SearchController implements IController {
    public path = "/search";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.search);
        this.router.post(`${this.path}/follow`, this.changeFollow)
    }

    private search = async (req: Request, res: Response) => {
        const currentUser = "billgates"; 
        // req.user?.username
        const mock = new MockPostService();
        const searchFor = String(req.query.query);
        const resultUsers = mock.searchUser(searchFor);
        const resultPosts = mock.searchPost(searchFor);
        const currentFollowing = db.users.filter((user) => user.username === currentUser)[0].following;
        
        res.render("search/views/search", { resultUsers: resultUsers, resultPosts: resultPosts, getUsernameById: mock.getUsernameById, checkFollowing: mock.checkFollowing, currentFollowing: currentFollowing, currentUser: currentUser });
    };

    private changeFollow = async (req: Request, res: Response) => {
        const mock = new MockPostService();
        const currentUser = "billgates"; 
        const currentFollowing = db.users.filter((user) => user.username === currentUser)[0].following;
        const userId = Number(req.query.userId);
        // console.log(userId)
        if(req.body) {
            mock.changeFollow(userId, currentUser)
        }

        res.redirect("back")
    }
}
export default SearchController;
