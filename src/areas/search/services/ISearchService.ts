import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

export default interface ISearchService {
  searchUsers(query: string): Promise<IUser[]>;

  searchPosts(query: string): Promise<IPost[]>;
}
