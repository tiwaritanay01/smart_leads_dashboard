export enum UserRole {
  Admin = "Admin",
  Sales = "Sales"
}

export interface IUser {
  _id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}
