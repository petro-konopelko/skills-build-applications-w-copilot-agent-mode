import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, default: 30 },
    difficulty: { type: String, default: 'moderate' },
  },
  { timestamps: true },
);

export default model('Workout', workoutSchema);
