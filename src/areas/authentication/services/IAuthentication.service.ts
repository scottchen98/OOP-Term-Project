// import IPost from "./post.interface";
import IUser from "../../../interfaces/user.interface";
import { comments, posts, PrismaClient, users } from "@prisma/client";

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
  findUserByEmail(email: string): Promise<users | null>;

  createUser(user: SignUp): Promise<users | undefined>;

  getUserByEmailAndPassword(email: string, password: string): Promise<users | undefined>;
}
