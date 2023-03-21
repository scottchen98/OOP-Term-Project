import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(post: IPost, username: string): void;

  sortPosts(posts: IPost[]): IPost[];

  getAllPosts(userId: number): IPost[];

  findById(id: string): IPost | undefined;

  findByUsername(username: string): IUser | undefined;

  addCommentToPost(
    message: { id: string; createdAt: string; userId: string; message: string },
    postId: string
  ): IPost | void;

  likePost(postId: number, userId: number, post: IPost): void;


}
