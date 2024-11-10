import { Status } from "./status";

export interface Candidate {
    id: string;
    name: string;
    image: string;
    votes: number;
  }
  
  export interface CandidatesState {
    candidates: Candidate[];
    status: Status;
    error: string | null;
  }
  
  