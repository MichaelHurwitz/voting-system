// src/server.ts
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import candidateRoutes from "./routes/candidateRoutes";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", authenticate, candidateRoutes); // המועמדים מאובטחים על ידי טוקן

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
