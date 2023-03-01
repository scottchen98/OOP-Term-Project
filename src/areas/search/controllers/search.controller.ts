import express from "express";
import IController from "../../../interfaces/controller.interface";

class SearchController implements IController {
  public path = "/search";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.searchQuery);
  }

  private searchQuery = (req: express.Request, res: express.Response) => {
    res.render("search/views/search.ejs");
  };
}

export default SearchController;
