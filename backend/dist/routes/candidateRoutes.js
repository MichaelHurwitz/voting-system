"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const voteController_1 = require("../controllers/voteController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/candidates", candidateController_1.getCandidates);
router.post("/vote", authMiddleware_1.authenticate, voteController_1.handleVote);
exports.default = router;
