import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const emitVoteUpdate = (updatedCandidate: { candidateId: string; votes: number }) => {
  if (io) {
    io.emit("voteUpdate", updatedCandidate);
  }
};
