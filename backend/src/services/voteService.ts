import Candidate from "../models/candidate";
import { emitVoteUpdate } from "../socket/socketManager";

export const voteForCandidate = async (candidateId: string) => {
  const candidate = await Candidate.findById(candidateId);
  if (!candidate) {
    throw new Error("Candidate not found");
  }

  candidate.votes += 1;
  await candidate.save();

  emitVoteUpdate({ candidateId: candidate._id.toString(), votes: candidate.votes });

  return candidate;
};
