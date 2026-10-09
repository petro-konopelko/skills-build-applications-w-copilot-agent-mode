"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    sport: { type: String, default: 'General fitness' },
    members: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Team', teamSchema);
