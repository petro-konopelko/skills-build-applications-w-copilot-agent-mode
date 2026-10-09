import express from 'express';
import { connectDatabase } from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

const createResourceHandler = (model: any, resourceName: string) => {
  const router = express.Router();

  router.get('/', async (_req, res) => {
    try {
      const records = await model.find({});
      res.json(records);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ message: `Unable to load ${resourceName}`, error: message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const record = await model.create(req.body);
      res.status(201).json(record);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ message: `Unable to create ${resourceName}`, error: message });
    }
  });

  return router;
};

app.get('/api/health', async (_req, res) => {
  try {
    const connection = await connectDatabase();
    res.json({
      status: 'ok',
      database: connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ status: 'error', message });
  }
});

app.use('/api/users/', createResourceHandler(User, 'users'));
app.use('/api/teams/', createResourceHandler(Team, 'teams'));
app.use('/api/activities/', createResourceHandler(Activity, 'activities'));
app.use('/api/leaderboard/', createResourceHandler(Leaderboard, 'leaderboard'));
app.use('/api/workouts/', createResourceHandler(Workout, 'workouts'));

void connectDatabase().catch((error) => {
  console.error('MongoDB connection failed:', error);
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});

export { app }; 
