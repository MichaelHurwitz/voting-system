// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return; // עצירה של הביצוע במקרה של חוסר הרשאה
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // הגדרת המידע של המשתמש בבקשה
    next(); // מעבר לבקר הבא
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
    return; // עצירה של הביצוע במקרה של טוקן לא תקף
  }
};
