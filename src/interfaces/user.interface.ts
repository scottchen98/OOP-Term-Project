import IPost from "./post.interface";

export default interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  following: IUser[];
  followers: IUser[];
}
