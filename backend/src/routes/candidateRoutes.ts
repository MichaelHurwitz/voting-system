import express from "express";
import { getCandidates } from "../controllers/candidateController";

const router = express.Router();

router.get("/candidates", getCandidates);

export default router;
