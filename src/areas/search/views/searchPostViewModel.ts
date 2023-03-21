import { database } from "../../../model/fakeDB";
import IPost from "../../../interfaces/post.interface";
import IUser from "../../../interfaces/user.interface";

export class SearchPostViewModel {
  readonly _db = database;
  public formattedPost: { fullName: string; message: string };

  constructor(post: IPost) {
    this.formattedPost = this.formatPost(post);
  }

  private formatPost(post: IPost) {
    const user = this.getUser(post.userId);
    return {
      fullName: `${user.firstName} ${user.lastName}`,
      message: post.message,
    };
  }

  private getUser(id: number): IUser {
    return this._db.users.filter((user) => {
      return user.id === id;
    })[0];
  }
}
