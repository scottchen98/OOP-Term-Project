import IPost from "../../../interfaces/post.interface";
import IPostService from "./IPostService";
import { database as db } from "../../../model/fakeDB";
import IComment from "../../../interfaces/comment.interface";
import IUser from "../../../interfaces/user.interface";

// ⭐️ Feel free to change this class in any way you like. It is simply an example...
export class MockPostService implements IPostService {
  addPost(message: string, username: string): void {
    let post: IPost = {
    postId: Math.max(...Object.keys(db.posts).map(Number)) + 2,
    // postId: Math.max(...db.posts.map(post => post.postId)) + 1,
    userId: db.users.filter((user) => user.username === username)[0].id,
    message: message,
    likes: 0,
    commentList: [],
    createdAt: Date.now(),
  }
  db.posts.push(post);
  console.log("fkDB: ", db.posts)
    console.log("posts keys: ", Object.keys(db.posts));
    console.log("postIDs: ", post.postId);
    // 🚀 Implement this yourself.
    // throw new Error("Method not implemented.");
  }
  getAllPosts(username: string): IPost[] {
    // Get current user data
    const userData = db.users.filter((user) => user.username === username)[0];
    
    // Get the posts from user followings
    const userFollowing = userData.following;
    const followingPosts = db.posts.filter((post) => userFollowing.includes(post.userId));
 
    // Get user's posts
    const userPosts = db.posts.filter((post) => post.userId === userData.id);

    // All posts
    const allPosts = userPosts.concat(followingPosts);

    return allPosts
    // 🚀 Implement this yourself.
    // throw new Error("Method not implemented.");
  }
  findById(id: number): IPost {
    const post = db.posts.filter((post) => post.postId === id)[0];
    return post
    // 🚀 Implement this yourself.
    // throw new Error("Method not implemented.");
  }
  addCommentToPost(postId: number, userId: number, message: string): void {
    let comment: IComment = {
      id: Math.max(...Object.keys(db.comments).map(Number)) + 1,
      postId: postId,
      userId: userId,
      message: message,
      createdAt: Date.now()
    }
    db.comments.push(comment);
    this.findById(postId).commentList.push(comment.id)
    // 🚀 Implement this yourself.
    // throw new Error("Method not implemented.");
  }


  sortByDate(toSort: IPost[] | IComment[]): IPost[] | IComment[] {
    toSort.sort((a, b) => b.createdAt - a.createdAt);
    return toSort
    // 🚀 Implement this yourself.
    // throw new Error("Method not implemented.");
  }

  getCommentsById(postId: number): IComment[] {
    const comments = db.comments.filter((comment) => comment.postId === postId);
    return comments
  }

  getUsernameById(userId: number): string {
    let username = db.users.filter((user) => user.id === userId)[0].username;

    return username
  }

  deletePost(postId: number): void {
    const deleteIndex = db.posts.indexOf(this.findById(postId));
    console.log(this.findById(postId))
    delete db.posts[deleteIndex]
  }

  searchUser(searchFor: string): IUser[] {
    const searchResult = db.users.filter((user) => 
      user.firstName === searchFor || user.lastName === searchFor
    );

    return searchResult
  }

  searchPost(searchFor: string): IPost[] {
    const searchResult = db.posts.filter((post) =>
      post.message.includes(searchFor) 
    );

    return searchResult
  }

  checkFollowing(userId: number, currentFollowing: number[]): boolean {
    return currentFollowing.includes(userId)

  }

  changeFollow(userId: number, currentUsername: string): void {
    const currentUserIndex = db.users.indexOf(db.users.filter((user) => user.username === currentUsername)[0]);
    // console.log(currentUserIndex);
    const currentFollowing = db.users.filter((user) => user.username === currentUsername)[0].following;
    const userIndex = currentFollowing.indexOf(userId);
    if(currentFollowing.includes(userId)) {
      delete db.users[currentUserIndex].following[userIndex]
    } else {
      db.users[currentUserIndex].following.push(userId)
    }
  }
}

// const test = new MockPostService();
// const posts = test.getAllPosts("billgates");
// console.log(test.sortPosts(posts))

// test.addPost({ postId: 21, userId: 9, message: "New post", likes: 4, comments: 5, createdAt: 0 }, "billgates")
// console.log(db.posts)