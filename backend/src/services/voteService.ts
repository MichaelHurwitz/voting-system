import User from "../models/UserModel";
import Candidate from "../models/candidate";
import { emitVoteUpdate } from "../socket/socketManager";

export const voteForCandidate = async (userId: string, candidateId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.hasVoted) {
    throw new Error("You have already voted");
  }

  const candidate = await Candidate.findById(candidateId);
  if (!candidate) {
    throw new Error("Candidate not found");
  }

  candidate.votes += 1;
  await candidate.save();

  user.hasVoted = true;
  user.votedFor = candidate._id;
  await user.save();

  emitVoteUpdate({ candidateId: candidate._id.toString(), votes: candidate.votes });

  return candidate;
};
