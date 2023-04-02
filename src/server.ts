import App from "./app";
import PostController from "./areas/post/controllers/post.controller";
import LandingController from "./areas/landing/controllers/Landing.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";
import SearchController from "./areas/search/controllers/search.controller";
import { AuthenticationService } from "./areas/authentication/services";
import { SearchService } from "./areas/search/services/Search.service";

const server = new App([
  new LandingController(),
  new PostController(new PostService()),
  new AuthenticationController(new AuthenticationService()),
  new SearchController(new SearchService()),
]);

server.start();
