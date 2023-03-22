// import IPost from "./post.interface";
import IUser from "../../../interfaces/user.interface";

interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export interface IAuthenticationService {
  _db: any;
  findUserByEmail(email: String): Promise<IUser | null>;

  createUser(user: SignUp): Promise<IUser | undefined>;

  getUserByEmailAndPassword(email: string, password: string): Promise<IUser | undefined>;
}
