import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { updateCandidates } from "../features/candidates/candidatesSlice"; 

const socket = io(import.meta.env.VITE_SERVER_URL);

export const useVoteUpdates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("voteUpdate", (updatedCandidate) => {
      dispatch(updateCandidates(updatedCandidate));
    });

    return () => {
      socket.off("voteUpdate");
    };
  }, [dispatch]);
};
