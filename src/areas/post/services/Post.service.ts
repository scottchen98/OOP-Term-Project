import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(userId: number): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  findByUsername(username: string): IUser {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  likePost(postId: number, userId: number, post:IPost): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
}
