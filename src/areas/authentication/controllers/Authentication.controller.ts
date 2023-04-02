import express from "express";
import IController from "../../../interfaces/controller.interface";
import { IAuthenticationService } from "../services";
import passport from "passport";
import { forwardAuthenticated } from "../../../middleware/authentication.middleware";
import IUser from "../../../interfaces/user.interface";
import { MockAuthenticationService } from "../services/Authentication.service.mock";

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}
interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

class AuthenticationController implements IController {
  public path = "/auth";
  public router = express.Router();
  private service: IAuthenticationService;

  constructor(service: IAuthenticationService) {
    this.initializeRoutes();
    this.service = service;
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/register`, forwardAuthenticated, this.showRegistrationPage);
    this.router.post(`${this.path}/register`, forwardAuthenticated, this.registration);
    this.router.get(`${this.path}/login`, forwardAuthenticated, this.showLoginPage);
    this.router.post(`${this.path}/login`, this.login);
    this.router.get(`${this.path}/logout`, this.logout);
  }

  private showLoginPage = (req: express.Request, res: express.Response) => {
    const errorMsg = req.session.messages ? req.session.messages[0] : false;
    req.session.messages = [];
    res.render("authentication/views/login", { errorMsg });
  };

  private showRegistrationPage = (req: express.Request, res: express.Response) => {
    const errorMsg = req.session.messages ? req.session.messages[0] : false;
    req.session.messages = [];
    res.render("authentication/views/register", { errorMsg });
  };

  // 🔑 These Authentication methods needs to be implemented by you
  private login = passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/auth/login",
    failureMessage: true,
  });

  private registration = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user: SignUp = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const newUser = await this.service.createUser(user);
      res.redirect("/auth/login");
    } catch (error) {
      if (error instanceof Error) {
        if (req.session.messages) {
          req.session.messages.push(error.message);
          res.redirect("/auth/register");
        }
      }
    }
  };

  private logout = async (req: express.Request, res: express.Response) => {
    req.logOut();
    res.redirect("/");
  };
}

export default AuthenticationController;
