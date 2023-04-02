interface IComment {
  id: number;
  postId: number;
  userId: number;
  message: string;
  createdAt: Date;
}

export default IComment;
