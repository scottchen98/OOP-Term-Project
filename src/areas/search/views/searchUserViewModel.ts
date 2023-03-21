import IUser from "../../../interfaces/user.interface";

export class SearchUserViewModel {
  public fullName: string;

  constructor(user: IUser) {
    this.fullName = this.formatUser(user);
  }

  private formatUser(user: IUser) {
    return `${user.firstName} ${user.lastName}`;
  }
}
