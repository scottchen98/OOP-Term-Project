import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(message: string, username: string): void;

  sortByDate(toSort: IPost[] | IComment[]): IPost[] | IComment[];

  getAllPosts(username: string): IPost[];

  findById(id: number): IPost | undefined;

  addCommentToPost(postId: number, userId: number, message: string): void;

  searchUser(searchFor: string): IUser[];

  searchPost(searchFor: string): IPost[];

  checkFollowing(userId: number, currentFollowing: number[]): boolean;

  changeFollow(userId: number, currentUsername: string): void;

  findByUsername(username: string): IUser | undefined;

  likePost(postId: number, userId: number, post: IPost): void;
}
