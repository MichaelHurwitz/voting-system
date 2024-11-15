import { Request, Response } from "express";
import { voteForCandidate } from "../services/voteService";

export const handleVote = async (req: Request, res: Response) => {
  const { candidateId } = req.body;
  const userId: string = req.user._id.toString();

  try {
    const candidate = await voteForCandidate(userId, candidateId);
    res.status(200).json({ message: "Vote recorded", candidate });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
