import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: String, required: true },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 1 },
    period: { type: String, default: 'weekly' },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);
