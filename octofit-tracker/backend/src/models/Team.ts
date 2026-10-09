import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    sport: { type: String, default: 'General fitness' },
    members: [{ type: String }],
  },
  { timestamps: true },
);

export default model('Team', teamSchema);
