import IUser from "../../../interfaces/user.interface";
import { comments, posts, PrismaClient, users } from "@prisma/client";

export class SearchUserViewModel {
  public resultUser: {
    id: number;
    username: string | null;
    firstName: string;
    lastName: string;
  };

  constructor(user: users) {
    this.resultUser = this.formatUser(user);
  }

  private formatUser(user: users) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
