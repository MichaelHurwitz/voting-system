"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const socketManager_1 = require("./socket/socketManager");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, db_1.default)();
// Routes
app.use("/api", authRoutes_1.default);
app.use("/api", candidateRoutes_1.default); // נתיבים מוגנים ע"י טוקן
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Initialize Socket.IO
(0, socketManager_1.initSocket)(server);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
