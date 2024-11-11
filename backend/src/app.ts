import express from "express";
import http from "http";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import { initSocket } from "./socket/socketManager";

dotenv.config();

const app = express();
const server = http.createServer(app); 
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", candidateRoutes); 

// Error handling middleware
app.use(errorHandler);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
