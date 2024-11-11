"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitVoteUpdate = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
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
exports.initSocket = initSocket;
const emitVoteUpdate = (updatedCandidate) => {
    if (io) {
        io.emit("voteUpdate", updatedCandidate);
    }
};
exports.emitVoteUpdate = emitVoteUpdate;
