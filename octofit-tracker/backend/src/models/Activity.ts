import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    user: { type: String, required: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);
