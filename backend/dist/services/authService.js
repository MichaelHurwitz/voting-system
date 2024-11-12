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
exports.loginUser = exports.registerUser = void 0;
// src/services/authService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const registerUser = (username, password, isAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield UserModel_1.default.findOne({ username });
    if (existingUser)
        throw new Error("Username already taken");
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new UserModel_1.default({ username, password: hashedPassword, isAdmin });
    return yield newUser.save();
});
exports.registerUser = registerUser;
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ username });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user: { id: user._id, username: user.username, isAdmin: user.isAdmin } };
});
exports.loginUser = loginUser;
