interface IComment {
  id: number;
  postId: number
  userId: number;
  message: string;
  createdAt: number;
}

export default IComment;
