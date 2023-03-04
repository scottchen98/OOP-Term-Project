import IComment from "./comment.interface";

interface IPost  {
  postId: number;
  userId: number;
  message: string;
  likes: number;
  createdAt: number;
  commentList: number[];
}


export default IPost;
