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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleVote = void 0;
const voteService_1 = require("../services/voteService");
const handleVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { candidateId } = req.body;
    try {
        const candidate = yield (0, voteService_1.voteForCandidate)(candidateId);
        res.status(200).json({ message: "Vote recorded", candidate });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
});
exports.handleVote = handleVote;
