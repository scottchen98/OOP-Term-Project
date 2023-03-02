import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import ISearchService from "./ISearchService";

export class MockSearchService implements ISearchService {
  readonly _db = database;

  public async searchUsers(query: string): Promise<IUser[]> {
    const trimmedQuery = query.trim().toLowerCase();
    const foundUsers = this._db.users.filter((user) => {
      return user.firstName.toLowerCase().includes(trimmedQuery) || user.lastName.toLowerCase().includes(trimmedQuery);
    });
    return foundUsers;
  }

  public async searchPosts(query: string): Promise<IPost[]> {
    const trimmedQuery = query.trim().toLowerCase();
    const foundPosts = this._db.posts.filter((post) => post.message.toLowerCase().includes(trimmedQuery));
    return foundPosts;
  }
}
