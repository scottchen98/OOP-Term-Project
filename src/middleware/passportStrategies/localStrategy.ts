import IUser from "../../interfaces/user.interface";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { MockAuthenticationService } from "../../areas/authentication/services/Authentication.service.mock";
import { PassportStrategy } from "../../interfaces/strategy.interface";

const mockAuthentication = new MockAuthenticationService();

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await mockAuthentication.getUserByEmailAndPassword(email, password);

      done(null, user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        done(null, false, error);
      }
    }
  }
);

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      password: string;
      username: string;
      firstName: string;
      lastName: string;
      following: number[];
      followers: number[];
    }
  }
}

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
