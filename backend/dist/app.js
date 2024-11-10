"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, db_1.default)();
// Routes
app.use("/api", authRoutes_1.default);
app.use("/api", authMiddleware_1.authenticate, candidateRoutes_1.default); // המועמדים מאובטחים על ידי טוקן
// Error handling middleware
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
