import { User } from "../models/user";
import { IUser } from "../../../domain/user";
import bcrypt from "bcrypt";

const registerUser = async (userData: IUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    role: userData.role ?? "user"
  });
  return newUser.save();
};

const findUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

const findUserById = async (id: string) => {
  return User.findById(id);
};

export default { registerUser, findUserByEmail, findUserById };