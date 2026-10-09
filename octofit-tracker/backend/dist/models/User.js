"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    goal: { type: String, default: 'Stay active' },
    team: { type: String, default: 'Independent' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
