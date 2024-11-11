import { Status } from "./status";

export interface Candidate {
    _id: string;
    name: string;
    image: string;
    votes: number;
  }
  
  export interface CandidatesState {
    candidates: Candidate[];
    status: Status;
    error: string | null;
  }
  
  