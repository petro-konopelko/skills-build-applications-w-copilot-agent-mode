import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    goal: { type: String, default: 'Stay active' },
    team: { type: String, default: 'Independent' },
  },
  { timestamps: true },
);

export default model('User', userSchema);
