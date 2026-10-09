"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await User_1.default.deleteMany({});
        await Team_1.default.deleteMany({});
        await Activity_1.default.deleteMany({});
        await Leaderboard_1.default.deleteMany({});
        await Workout_1.default.deleteMany({});
        await User_1.default.insertMany([
            { name: 'Mona', email: 'mona@example.com', goal: 'Train for a 10K' },
            { name: 'Aiden', email: 'aiden@example.com', goal: 'Build core strength' },
        ]);
        await Team_1.default.insertMany([
            { name: 'Octocats', sport: 'Running', members: ['Mona', 'Aiden'] },
            { name: 'Power Pups', sport: 'Strength', members: ['Sam', 'Jin'] },
        ]);
        await Activity_1.default.insertMany([
            { type: 'Run', durationMinutes: 30, caloriesBurned: 240, user: 'Mona' },
            { type: 'Yoga', durationMinutes: 20, caloriesBurned: 120, user: 'Aiden' },
        ]);
        await Leaderboard_1.default.insertMany([
            { user: 'Mona', score: 860, rank: 1 },
            { user: 'Aiden', score: 760, rank: 2 },
        ]);
        await Workout_1.default.insertMany([
            { name: 'Intervals', type: 'Cardio', durationMinutes: 25, difficulty: 'hard' },
            { name: 'Hill Sprint', type: 'Strength', durationMinutes: 20, difficulty: 'medium' },
        ]);
        console.log('Seed the octofit_db database with test data');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
