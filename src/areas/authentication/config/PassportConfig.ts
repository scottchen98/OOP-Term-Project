//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)
import passport from "passport";
import { PassportStrategy } from "../../../interfaces/strategy.interface";
import { MockAuthenticationService } from "../services";

export default class PassportConfig {
  constructor(strategies: PassportStrategy[]) {
    this.addStrategies(strategies);
    this.serializeUser();
    this.deserializeUser();
  }
  private addStrategies(strategies: PassportStrategy[]): void {
    strategies.forEach((passportStrategy: PassportStrategy) => {
      passport.use(passportStrategy.name, passportStrategy.strategy);
    });
  }

  private serializeUser() {
    passport.serializeUser(function (user: Express.User, done: (err: any, id: number) => void) {
      done(null, user.id);
    });
  }

  private deserializeUser() {
    passport.deserializeUser(async function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
      const mockAuthentication = new MockAuthenticationService();
      let user = await mockAuthentication.getUserById(id);
      if (user) {
        done(null, user);
      } else {
        done({ message: "User not found" }, null);
      }
    });
  }
}
