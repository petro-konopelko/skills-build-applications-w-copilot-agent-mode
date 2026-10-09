"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    difficulty: { type: String, default: 'moderate' },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Workout', workoutSchema);
