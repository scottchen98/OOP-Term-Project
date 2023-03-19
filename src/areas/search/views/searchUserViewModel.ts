import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  public resultUser: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };

  constructor(user: IUser) {
    this.resultUser = this.formatUser(user);
  }

  private formatUser(user: IUser) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
