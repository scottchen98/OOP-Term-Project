import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import { comments, posts, PrismaClient, users } from "@prisma/client";

export default interface ISearchService {
  searchUsers(query: string): Promise<users[]>;

  searchPosts(query: string): Promise<posts[]>;

  getAllUsernames(
    resultPost: {
      postId: number;
      userId: number;
      message: string | null;
    }[]
  ): Promise<(string | null)[]>;

  getCurrentFollowingUsers(username: string): Promise<users[] | null>;

  checkFollowing(
    resultUsers: {
      id: number;
      username: string | null;
      firstName: string;
      lastName: string;
    }[],
    currentFollowingUsers: users[] | null
  ): Promise<boolean[]>;

  getCurrentUser(userId: number): Promise<
    | (users & {
        following: users[];
      })
    | null
    | null
  >;

  followUser(currentUserId: number, followingUserId: number): Promise<users>;

  unfollowUser(currentUserId: number, followingUserId: number): Promise<users>;
}
