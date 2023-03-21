import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export class SearchPostViewModel {
  readonly _db = database;
  public resultPost: {
    postId: number;
    userId: number;
    message: string;
  };

  constructor(post: IPost) {
    this.resultPost = this.formatPost(post);
  }

  private formatPost(post: IPost) {
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
