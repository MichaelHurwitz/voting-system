import Candidate from "../models/candidate";

export const getAllCandidates = async () => {
  return await Candidate.find();
};
