import userQueries from "../infrastructure/mongodb/queries/user";

export const register = (dependencies: any) => async (userData: any) => {
  const existingUser = await userQueries.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  if (!userData.name || !userData.email || !userData.password) {
    throw new Error("Name, email and password are required");
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Invalid email format");
  }
  if (userData.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const result = await userQueries.registerUser(userData);
  return result;
};