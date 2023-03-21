import IPost from "./post.interface";

export default interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  following?: number[];
  followers?: number[];
  username: string;
}
