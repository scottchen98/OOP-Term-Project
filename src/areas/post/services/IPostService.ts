import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import { comments, posts, PrismaClient, users } from "@prisma/client";

// ⭐️ Feel free to change this interface in any way you like. It is simply an example...
export default interface IPostService {
  addPost(message: string, userId: number): void;

  getAllPosts(username: string): Promise<(posts & { commentList: comments[] })[]>;

  getUsernamesOfCommentsOrPosts(
    allCommentsOrAllPosts: comments[] | posts[]
  ): Promise<({ username: string | null } | null)[]>;

  findById(postId: number): Promise<(posts & { commentList: comments[] }) | null>;

  getUsernameById(userId: number): Promise<string | null | undefined>;

  getCommentsById(postId: number): Promise<comments[]>;

  addCommentToPost(postId: number, userId: number, message: string): void;

  likePost(postId: number, userId: number): void;

  deletePost(postId: number): void;
}
