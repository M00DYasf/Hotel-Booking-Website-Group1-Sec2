export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "guest" | "user" | "admin";
  createdAt?: Date;
}