import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | undefined> {
    let user = await this.findUserByEmail(email);

    if (user) {
      if (await this.isUserValid(user, password)) {
        return user;
      }
    }
  }

  public async isUserValid(user: IUser, password: string): Promise<boolean> {
    if (user.password === password) {
      return true;
    }
    throw new Error("Password is incorrect");
  }

  public async findUserByEmail(email: string): Promise<null | IUser> {
    let user = this._db.users.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`User with that email does not exist`);
  }

  public async getUserById(id: number): Promise<false | IUser> {
    let user = this._db.users.find((user) => user.id === id);

    return user ? user : false;
  }

  public async createUser(user: IUser): Promise<IUser> {
    user.id = database.users.length + 1;
    database.users.push(user);
    return user;
  }
}
