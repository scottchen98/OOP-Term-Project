import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import bcrypt from "bcrypt";

interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export class MockAuthenticationService implements IAuthenticationService {
  readonly _db = database;

  public async getUserByEmailAndPassword(email: string, password: string): Promise<IUser | undefined> {
    const user = await this.findUserByEmail(email);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return user;
      }
      throw new Error("Password is incorrect");
    }
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

  public async createUser(user: SignUp): Promise<IUser | undefined> {
    try {
      const { firstName, lastName, username, email, password } = user;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUser = {
        id: this._db.users.length + 1,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username,
        following: [],
        followers: [],
      };

      this._db.users.push(newUser);
      return newUser;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
}
