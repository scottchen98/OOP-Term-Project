import IComment from "./comment.interface";
import IPost from "./post.interface";
import IUser from "./user.interface";

// ⭐️ Feel free to change this interface to your liking
export default interface IDatabase {
  users: IUser[];
  posts: IPost[];
  comments: IComment[];
}
