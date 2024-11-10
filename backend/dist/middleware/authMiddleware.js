"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return; // עצירה של הביצוע במקרה של חוסר הרשאה
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // הגדרת המידע של המשתמש בבקשה
        next(); // מעבר לבקר הבא
    }
    catch (error) {
        res.status(401).json({ message: "Token is not valid" });
        return; // עצירה של הביצוע במקרה של טוקן לא תקף
    }
};
exports.authenticate = authenticate;
