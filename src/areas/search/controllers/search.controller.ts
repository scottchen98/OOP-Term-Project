import express from "express";
import IController from "../../../interfaces/controller.interface";
import ISearchService from "../services/ISearchService";
import { MockSearchService } from "../services/Search.service.mock";
import { SearchPostViewModel } from "../views/searchPostViewModel";
import { SearchUserViewModel } from "../views/searchUserViewModel";

class SearchController implements IController {
  public path = "/search";
  public router = express.Router();

  constructor(searchService: ISearchService) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.searchQuery);
  }

  private searchQuery = async (req: express.Request, res: express.Response) => {
    const query = String(req.query.query);
    const mockSearch = new MockSearchService();
    const foundUsers = await mockSearch.searchUsers(query);
    const foundPosts = await mockSearch.searchPosts(query);
    const fullNames = foundUsers.map((user) => new SearchUserViewModel(user));
    const posts = foundPosts.map((post) => new SearchPostViewModel(post));
    res.render("search/views/search.ejs", { fullNames, posts });
  };
}

export default SearchController;
