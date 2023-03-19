import { MockAuthenticationService } from "../areas/authentication/services";
import passport from "passport";
import PassportConfig from "../areas/authentication/config/PassportConfig";
import localStrategy from "./passportStrategies/localStrategy";
import express from "express";

module.exports = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
  // Use PassportConfig class here
  new PassportConfig([localStrategy]);
};
