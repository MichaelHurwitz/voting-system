import { Status } from "./status";

export interface User {
    id: string;
    username: string;
    isAdmin: boolean;
  }
  
  export interface UserState {
    user: User | null;
    token: string | null;
    status: Status;
    error: string | null;
    isAdmin?: boolean;
  }
  
  