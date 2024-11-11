import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, isAdmin } = req.body;
    const user = await registerUser(username, password, isAdmin);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;
    
    const result = await loginUser(username, password);
    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};
