export enum UserRole {
  Admin = "Admin",
  Sales = "Sales"
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
}
