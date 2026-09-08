import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex.runner', email: 'alex@example.com', displayName: 'Alex Runner' },
      { username: 'sam.strength', email: 'sam@example.com', displayName: 'Sam Strength' },
    ]);
    const teams = await Team.create([
      { name: 'Peak Performers', description: 'Small steps, strong finish.', memberIds: users.map((user) => user.id) },
    ]);
    await User.updateMany({}, { teamId: teams[0].id });
    await Activity.create([
      { userId: users[0].id, type: 'running', durationMinutes: 30, points: 30 },
      { userId: users[1].id, type: 'strength', durationMinutes: 25, points: 25 },
    ]);
    await LeaderboardEntry.create([
      { userId: users[0].id, displayName: users[0].displayName, teamId: teams[0].id, points: 30 },
      { userId: users[1].id, displayName: users[1].displayName, teamId: teams[0].id, points: 25 },
    ]);
    await Workout.create([
      { title: 'Starter Circuit', description: 'A balanced full-body workout.', level: 'beginner', durationMinutes: 20, activities: ['squats', 'lunges', 'plank'] },
      { title: 'Cardio Builder', description: 'Build stamina with short intervals.', level: 'intermediate', durationMinutes: 30, activities: ['jog', 'high knees', 'walk'] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
