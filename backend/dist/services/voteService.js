"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteForCandidate = void 0;
// src/services/voteService.ts
const candidate_1 = __importDefault(require("../models/candidate"));
const socketManager_1 = require("../socket/socketManager");
const voteForCandidate = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    const candidate = yield candidate_1.default.findById(candidateId);
    if (!candidate) {
        throw new Error("Candidate not found");
    }
    candidate.votes += 1;
    yield candidate.save();
    // המרת candidateId ל-string לפני שידור
    (0, socketManager_1.emitVoteUpdate)({ candidateId: candidate._id.toString(), votes: candidate.votes });
    return candidate;
});
exports.voteForCandidate = voteForCandidate;