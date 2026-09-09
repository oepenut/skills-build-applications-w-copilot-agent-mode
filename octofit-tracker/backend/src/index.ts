import express from 'express';
import { connectDatabase } from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { apiBaseUrl } from './server.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend' });
});

app.get('/api/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.post('/api/teams', async (request, response, next) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities', async (request, response, next) => {
  try {
    const filter = typeof request.query.userId === 'string' ? { userId: request.query.userId } : {};
    response.json(await Activity.find(filter).sort({ completedAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.post('/api/activities', async (request, response, next) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard', async (_request, response, next) => {
  try {
    response.json(await LeaderboardEntry.find().sort({ points: -1, updatedAt: 1 }));
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts', async (request, response, next) => {
  try {
    const filter = typeof request.query.level === 'string' ? { level: request.query.level } : {};
    response.json(await Workout.find(filter).sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
});

app.post('/api/workouts', async (request, response, next) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

app.use((_error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  response.status(500).json({ error: 'Unable to process request' });
});

export { apiBaseUrl, app };

await connectDatabase();
app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});