import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../models/user";

export const registerUser = async (username: string, password: string, isAdmin: boolean) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Username already taken");

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, isAdmin });
  return await newUser.save();
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
  return { token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } };
};
