# Octofit Tracker Frontend

This frontend uses React 19 + Vite + Bootstrap and reads the backend base URL from Vite environment variables.

## Required environment variable

Define `VITE_CODESPACE_NAME` in your local environment (for example in `.env.local`):

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app uses this to call the backend at:

```text
https://<VITE_CODESPACE_NAME>-8000.app.github.dev
```

If `VITE_CODESPACE_NAME` is unset, the frontend safely falls back to:

```text
http://localhost:8000
```

## API routes used by the presentation tier

- `/api/activities/`
- `/api/leaderboard/`
- `/api/teams/`
- `/api/users/`
- `/api/workouts/`
