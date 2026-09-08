import mongoose, { Schema } from 'mongoose';

const timestamps = true;

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    teamId: { type: String, trim: true },
  },
  { timestamps },
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    memberIds: { type: [String], default: [] },
  },
  { timestamps },
);

const activitySchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0, default: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps },
);

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    teamId: { type: String, trim: true },
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps },
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activities: { type: [String], default: [] },
  },
  { timestamps },
);

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema);
export const Workout = mongoose.model('Workout', workoutSchema);