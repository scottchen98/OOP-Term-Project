import { MockAuthenticationService } from "../areas/authentication/services";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import localStrategy from "./passportStrategies/localStrategy";

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
  new PassportConfig([localStrategy]);
};
