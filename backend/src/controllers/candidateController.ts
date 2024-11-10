import { Request, Response } from "express";
import { getAllCandidates } from "../services/candidateService";

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await getAllCandidates();
    res.json(candidates);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
