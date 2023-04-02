import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import ISearchService from "./ISearchService";
import { DatabaseClient } from "../../../../DatabaseClient";
import { comments, posts, PrismaClient, users } from "@prisma/client";

export class SearchService implements ISearchService {
  readonly _db = DatabaseClient.getInstance();

  public async searchUsers(query: string): Promise<users[]> {
    // const trimmedQuery = query.trim().toLowerCase();

    try {
      const foundUsers = this._db.prisma.users.findMany({
        where: {
          OR: [
            {
              firstName: {
                contains: query.toLocaleLowerCase(),
              },
            },
            {
              lastName: {
                contains: query.toLocaleLowerCase(),
              },
            },
          ],
        },
      });
      return foundUsers;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async searchPosts(query: string): Promise<posts[]> {
    // const trimmedQuery = query.trim().toLowerCase();
    try {
      const foundPosts = this._db.prisma.posts.findMany({
        where: {
          message: {
            contains: query.toLocaleLowerCase(),
          },
        },
      });
      return foundPosts;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async getAllUsernames(resultPost: posts[]): Promise<(string | null)[]> {
    const allUsernames = await Promise.all(
      resultPost.map(async (post) => {
        return await this._db.prisma.users.findUnique({
          select: {
            username: true,
          },
          where: { id: post.userId },
        });
      })
    );
    return allUsernames.map((user) => user?.username ?? null);
  }

  public async getCurrentFollowingUsers(username: string): Promise<users[] | null> {
    const foundUser = await this._db.prisma.users.findUnique({
      where: { username: username },
      include: { following: true },
    });
    if (foundUser) {
      return foundUser.following;
    }
    return null;
  }

  public async checkFollowing(resultUsers: users[], currentFollowingUsers: users[] | null): Promise<boolean[]> {
    if (currentFollowingUsers) {
      const currentFollowingUserIds = currentFollowingUsers.map((user) => user.id);
      const checkFollowingResults = resultUsers.map((user) => currentFollowingUserIds.includes(user.id));
      return checkFollowingResults;
    } else {
      return [];
    }
  }

  public async getCurrentUser(userId: number): Promise<
    | (users & {
        following: users[];
      })
    | null
  > {
    const currentUser = await this._db.prisma.users.findUnique({
      where: { id: userId },
      include: { following: true },
    });
    return currentUser;
  }

  public async followUser(currentUserId: number, followingUserId: number): Promise<users> {
    const followUser = await this._db.prisma.users.update({
      where: {
        id: currentUserId,
      },
      data: {
        following: {
          connect: { id: followingUserId },
        },
      },
    });
    return followUser;
  }

  public async unfollowUser(currentUserId: number, followingUserId: number): Promise<users> {
    const unfollowUser = await this._db.prisma.users.update({
      where: {
        id: currentUserId,
      },
      data: {
        following: {
          disconnect: { id: followingUserId },
        },
      },
    });
    return unfollowUser;
  }
}
