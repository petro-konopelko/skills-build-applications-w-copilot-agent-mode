"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    period: { type: String, default: 'weekly' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
