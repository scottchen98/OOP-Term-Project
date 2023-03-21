import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database } from "../../../model/fakeDB";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(post: IPost, username: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }
  getAllPosts(userId: number): IPost[] {
    // 🚀 Implement this yourself.
    let postsFeed = []
    for (const user of database.users) {
      if (user.id === userId) {
        for (const post of database.posts) {
          if (post.userId === user.id || user.following.includes(post.userId)) {
            postsFeed.push(post)

          }
        }
      }
    }
    return postsFeed.sort((a, b) => b.createdAt - a.createdAt);
  }
  findById(id: string): IPost {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  findByUsername(username: string): IUser {
    // 🚀 Implement this yourself.
    for (const user of database.users) {
      if (user.username === username)
        return user
    }
  }

  addCommentToPost(message: { id: string; createdAt: string; userId: string; message: string }, postId: string): void {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  sortPosts(posts: IPost[]): IPost[] {
    // 🚀 Implement this yourself.
    throw new Error("Method not implemented.");
  }

  likePost(postid: number, userid: number, post: IPost): void {
    let newLike = {
      postId: postid,
      userId: userid,
      liked: false,
    }
    database.liked.push(newLike)

    for (const like of database.liked) {
      if (like.postId === postid && like.userId === userid) {
        if (like.liked === true) {
          like.liked = false
          post.likes -= 1
          console.log(database.liked)
          return
        } else if (like.liked === false) {
          like.liked = true
          post.likes += 1
          console.log(database.liked)
          return
        }
      } 
    }

  }



}

// has voted equals true 

