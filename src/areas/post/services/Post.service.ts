import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import IPostService from "./IPostService";

// ❗️ Implement this class much later, once everything works fine with your mock db
export class PostService implements IPostService {
  addPost(message: string, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  findById(id: number): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  addCommentToPost(postId: number, userId: number, message: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortByDate(toSort: IPost[] | IComment[]): IPost[] | IComment[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  searchUser(searchFor: string): IUser[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  searchPost(searchFor: string): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  checkFollowing(userId: number, currentFollowing: number[]): boolean {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  changeFollow(userId: number, currentUsername: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  findByUsername(username: string): IUser {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  likePost(postId: number, userId: number, post: IPost): void {}
}
