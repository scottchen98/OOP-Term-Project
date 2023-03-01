import IComment from "./comment.interface";

interface IPost {
  postId: number;
  userId: number;
  message: string;
  likes: number;
  comments: number;
  createdAt: number;
}

export default IPost;
