import express from 'express';
import db from './config/database';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${baseUrl}`);
});
