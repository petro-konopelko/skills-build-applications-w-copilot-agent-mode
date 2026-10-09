import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany([
      { name: 'Mona', email: 'mona@example.com', goal: 'Train for a 10K' },
      { name: 'Aiden', email: 'aiden@example.com', goal: 'Build core strength' },
    ]);

    await Team.insertMany([
      { name: 'Octocats', sport: 'Running', members: ['Mona', 'Aiden'] },
      { name: 'Power Pups', sport: 'Strength', members: ['Sam', 'Jin'] },
    ]);

    await Activity.insertMany([
      { type: 'Run', durationMinutes: 30, caloriesBurned: 240, user: 'Mona' },
      { type: 'Yoga', durationMinutes: 20, caloriesBurned: 120, user: 'Aiden' },
    ]);

    await Leaderboard.insertMany([
      { user: 'Mona', score: 860, rank: 1 },
      { user: 'Aiden', score: 760, rank: 2 },
    ]);

    await Workout.insertMany([
      { name: 'Intervals', type: 'Cardio', durationMinutes: 25, difficulty: 'hard' },
      { name: 'Hill Sprint', type: 'Strength', durationMinutes: 20, difficulty: 'medium' },
    ]);

    console.log('Seed the octofit_db database with test data');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
