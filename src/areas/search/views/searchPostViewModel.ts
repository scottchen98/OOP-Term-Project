import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";
import { comments, posts, PrismaClient, users } from "@prisma/client";

export class SearchPostViewModel {
  readonly _db = database;
  public resultPost: {
    postId: number;
    userId: number;
    message: string | null;
  };

  constructor(post: posts) {
    this.resultPost = this.formatPost(post);
  }

  private formatPost(post: posts) {
    return {
      postId: post.postId,
      userId: post.userId,
      message: post.message,
    };
  }

  private getUser(id: number): IUser {
    return this._db.users.filter((user) => {
      return user.id === id;
    })[0];
  }
}
