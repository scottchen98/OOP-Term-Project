import IUser from "../../../interfaces/user.interface";
import IPost from "../../../interfaces/post.interface";
import IComment from "../../../interfaces/comment.interface";
import IPostService from "./IPostService";
import { DatabaseClient } from "../../../../DatabaseClient";
import { comments, posts, PrismaClient, users } from "@prisma/client";

// ❗️ Implement this class much later, once everything works fine with your mock db
// export class PostService implements IPostService {
//   readonly _db: DatabaseClient = DatabaseClient.getInstance();

//   addPost(message: string, username: string): void {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   async getAllPosts(username: string): Promise<posts[]> {
//     // 🚀 Implement this yourself.
//     try {
//       const userData = await this._db.this._db.prisma.users.findUnique({
//         where: { username: username },
//         include: {
//           following: true,
//         },
//       });

//       const allPosts = await this._db.this._db.prisma.posts.findMany({
//         where: {
//           OR: [{ userId: { in: userData!.following.map((u) => u.id) } }, { userId: userData!.id }],
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: {
//           commentList: true,
//         },
//       });
//       return allPosts;
//     } catch (error) {
//       throw new Error("Method not implemented.");
//     }
//   }
//   async getAllUsernames(allPosts: posts[]): Promise<(string | null)[]> {
//     const allUsernames = await Promise.all(
//       allPosts.map(async (post) => {
//         return await this._db.this._db.prisma.users.findUnique({
//           select: {
//             username: true,
//           },
//           where: { id: post.userId },
//         });
//       })
//     );
//     return allUsernames.map((user) => user?.username ?? null);
//   }
//   async getCommentLengthForEachPost(
//     allPosts: (posts & {
//       commentList: comments[];
//     })[]
//   ): Promise<number[]> {
//     const eachPostCommentLength = allPosts.map((post) => post.commentList.length);
//     return eachPostCommentLength;
//   }

//   findById(id: number): IPost {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }
//   addCommentToPost(postId: number, userId: number, message: string): void {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   sortByDate(toSort: IPost[] | IComment[]): IPost[] | IComment[] {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   searchUser(searchFor: string): IUser[] {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   searchPost(searchFor: string): IPost[] {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   checkFollowing(userId: number, currentFollowing: number[]): boolean {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   changeFollow(userId: number, currentUsername: string): void {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   findByUsername(username: string): IUser | undefined {
//     // 🚀 Implement this yourself.
//     throw new Error("Method not implemented.");
//   }

//   likePost(postId: number, userId: number, post: IPost): void {}

export class PostService implements IPostService {
  readonly _db: DatabaseClient = DatabaseClient.getInstance();

  // Done ✅
  async addPost(message: string, userId: number): Promise<void> {
    try {
      const addPost = await this._db.prisma.posts.create({
        data: {
          userId: userId,
          message: message,
          likes: 0,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Done ✅
  async getAllPosts(username: string): Promise<(posts & { commentList: comments[] })[]> {
    try {
      const userData = await this._db.prisma.users.findUnique({
        where: { username },
        include: {
          following: true,
        },
      });

      const allPosts = await this._db.prisma.posts.findMany({
        where: {
          OR: [{ userId: { in: userData!.following.map((u) => u.id) } }, { userId: userData!.id }],
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          commentList: true,
        },
      });
      return allPosts;
    } catch (error) {
      throw error;
    }
  }

  // Done ✅
  async findById(postId: number): Promise<(posts & { commentList: comments[] }) | null> {
    // 🚀 Implement this yourself.
    try {
      const post = await this._db.prisma.posts.findUnique({
        where: { postId: postId },
        include: { commentList: true },
      });
      return post;
    } catch (error) {
      throw error;
    }
  }

  // Done ✅ HELPER
  async getUsernameById(userId: number): Promise<string | null | undefined> {
    try {
      const postUser = await this._db.prisma.users.findUnique({ where: { id: userId } });
      const postUsername = postUser?.username;
      return postUsername;
    } catch (error) {
      throw error;
    }
  }

  // Done ✅ HELPER
  async getUsernamesOfCommentsOrPosts(
    allCommentsOrAllPosts: comments[] | posts[]
  ): Promise<({ username: string | null } | null)[]> {
    try {
      const allUsernames = await Promise.all(
        allCommentsOrAllPosts!.map(async (obj: comments | posts) => {
          return await this._db.prisma.users.findUnique({
            select: {
              username: true,
            },
            where: { id: obj.userId },
          });
        })
      );

      return allUsernames;
    } catch (error) {
      throw error;
    }
  }

  // Done ✅
  async addCommentToPost(postId: number, userId: number, message: string): Promise<void> {
    // 🚀 Implement this yourself.
    try {
      const addCommentToPost = await this._db.prisma.comments.create({
        data: {
          postId: postId,
          userId: userId,
          message: message,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // Done ✅
  async likePost(postId: number, currentUserId: number): Promise<void> {
    // const currentUserId = req.user.id;
    try {
      // const postId = Number(req.params.id);
      const post = await this._db.prisma.posts.findUnique({
        where: { postId: postId },
        include: { liked: true },
      });
      const liked = post?.liked;
      const userLiked = liked?.filter((like) => like.userId === currentUserId)[0];
      // console.log(userLiked)
      if (userLiked) {
        if (userLiked.liked === 1) {
          await this._db.prisma.liked.update({
            where: { id: userLiked.id },
            data: {
              liked: 0,
            },
          });
          await this._db.prisma.posts.update({
            where: { postId: postId },
            data: {
              likes: { decrement: 1 },
            },
          });
        } else if (userLiked.liked === 0) {
          await this._db.prisma.liked.update({
            where: { id: userLiked.id },
            data: {
              liked: 1,
            },
          });
          await this._db.prisma.posts.update({
            where: { postId: postId },
            data: {
              likes: { increment: 1 },
            },
          });
        }
      } else {
        await this._db.prisma.liked.create({
          data: {
            userId: currentUserId,
            postId: postId,
            liked: 1,
          },
        });
        await this._db.prisma.posts.update({
          where: { postId: postId },
          data: {
            likes: { increment: 1 },
          },
        });
      }

      console.log(userLiked);

      // if (userLiked.liked === 1) {
      //   await this._db.prisma.liked.update({
      //     where: { id: userLiked.id },
      //     data: {
      //       liked: 0
      //     }
      //   })
      // } else if (userLiked.liked === 0 ) {
      //   await this._db.prisma.liked.update({
      //     where: { id: userLiked.id },
      //     data: {
      //       liked: 1
      //     }
      //   })
      // }
    } catch (error) {
      throw error;
    }
  }

  // Done ✅
  async deletePost(postId: number): Promise<void> {
    try {
      const deleteLikes = await this._db.prisma.liked.deleteMany({ where: { postId: postId } });
      const deleteComments = await this._db.prisma.comments.deleteMany({ where: { postId: postId } });
      const deletePost = await this._db.prisma.posts.delete({ where: { postId: postId } });
    } catch (error) {
      throw error;
    }
  }

  // Done ✅ HELPER
  async getCommentsById(postId: number): Promise<comments[]> {
    try {
      const comments = await this._db.prisma.comments.findMany({
        where: { postId: postId },
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
