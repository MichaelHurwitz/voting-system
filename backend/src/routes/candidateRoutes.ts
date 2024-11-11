import express from "express";
import { getCandidates } from "../controllers/candidateController";
import { handleVote } from "../controllers/voteController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/candidates", getCandidates);
router.post("/vote", authenticate, handleVote);

export default router;
