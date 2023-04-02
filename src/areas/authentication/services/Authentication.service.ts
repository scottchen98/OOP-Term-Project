import IUser from "../../../interfaces/user.interface";
import { IAuthenticationService } from "./IAuthentication.service";
import bcrypt from "bcrypt";
import EmailAlreadyExistsException from "../../../exceptions/EmailAlreadyExists";
import { DatabaseClient } from "../../../../DatabaseClient";
import { comments, posts, PrismaClient, users } from "@prisma/client";

interface SignUp {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

// ❗️ Implement this class much later, once everything works fine with your mock db
export class AuthenticationService implements IAuthenticationService {
  // ⭐️ _db should be a reference to your real database driver
  readonly _db: DatabaseClient = DatabaseClient.getInstance();

  async getUserByEmailAndPassword(email: string, password: string): Promise<users | undefined> {
    const user = await this.findUserByEmail(email);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return user;
      }
      throw new Error("Password is incorrect");
    }
  }
  async findUserByEmail(email: string): Promise<users | null> {
    const foundUser = await this._db.prisma.users.findUnique({
      where: { email: email },
      include: {
        following: true,
        followers: true,
        liked: true,
      },
    });

    if (foundUser) {
      return foundUser;
    }
    throw new Error(`User with that email does not exist`);
  }

  async getUserById(id: number): Promise<users | null> {
    const foundUser = await this._db.prisma.users.findUnique({
      where: { id: id },
      include: {
        following: true,
        followers: true,
        liked: true,
      },
    });
    if (foundUser) {
      return foundUser;
    }
    return null;
  }

  async createUser(user: SignUp): Promise<users | undefined> {
    const { firstName, lastName, username, email, password } = user;

    // check if any existing user has the same email
    const emailExists = await this._db.prisma.users.findUnique({
      where: { email: email },
    });

    if (emailExists) {
      throw new Error(new EmailAlreadyExistsException(email).message);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this._db.prisma.users.create({
        data: {
          email,
          password: hashedPassword,
          username,
          firstName,
          lastName,
        },
      });

      return newUser;
    }
  }
}
