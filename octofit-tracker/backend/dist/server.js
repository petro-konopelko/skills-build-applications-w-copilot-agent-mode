"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.baseUrl = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Team_1 = __importDefault(require("./models/Team"));
const User_1 = __importDefault(require("./models/User"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
exports.app = app;
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
exports.baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
const createResourceHandler = (model, resourceName) => {
    const router = express_1.default.Router();
    router.get('/', async (_req, res) => {
        try {
            const records = await model.find({});
            res.json(records);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(500).json({ message: `Unable to load ${resourceName}`, error: message });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const record = await model.create(req.body);
            res.status(201).json(record);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            res.status(400).json({ message: `Unable to create ${resourceName}`, error: message });
        }
    });
    return router;
};
app.get('/api/health', async (_req, res) => {
    try {
        const connection = await (0, database_1.connectDatabase)();
        res.json({
            status: 'ok',
            database: connection.readyState === 1 ? 'connected' : 'disconnected',
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ status: 'error', message });
    }
});
app.use('/api/users/', createResourceHandler(User_1.default, 'users'));
app.use('/api/teams/', createResourceHandler(Team_1.default, 'teams'));
app.use('/api/activities/', createResourceHandler(Activity_1.default, 'activities'));
app.use('/api/leaderboard/', createResourceHandler(Leaderboard_1.default, 'leaderboard'));
app.use('/api/workouts/', createResourceHandler(Workout_1.default, 'workouts'));
void (0, database_1.connectDatabase)().catch((error) => {
    console.error('MongoDB connection failed:', error);
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${exports.baseUrl}`);
});
