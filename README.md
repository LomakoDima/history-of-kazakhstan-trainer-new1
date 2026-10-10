# History of Kazakhstan — Oral Exam Trainer

An English-language trainer for the oral History of Kazakhstan exam, organised by the 15-week course syllabus.

## What is included

- About 550 multiple-choice questions arranged by syllabus week (Week 8 is a balanced midterm review of Weeks 1–7).
- Practice rounds (30 questions, 15 seconds each), a balanced Mixed round, and flashcards for free recall.
- Essay practice on 17 official topics with a 20-minute timer, Random Topic and Start Again controls.
- Claude-assisted essay review using four criteria: Human or AI, Fact Check, Relevance, and Depth.
- Progress (scores, flashcard statistics, theme) and the essay draft are saved in the browser's `localStorage`. "Reset saved progress" on the Overview page clears the statistics.
- Responsive mobile and desktop layout with light and dark themes.

## Run locally with AI review

Requirements: Node.js 20 or newer and an Anthropic API key.

1. `npm install`
2. Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY=...`.
3. `npm run dev`, then open `http://localhost:8787`.

On Windows you can instead double-click `start-trainer.bat`. It installs dependencies when needed, loads `.env` when that file exists, or asks for the key for the current session.

The browser sends essay text only to the `/api/evaluate` endpoint of the same site. The server reads the API key, so the key is never embedded in `index.html` or exposed to visitors.

### Configuration (`.env` or Vercel environment variables)

| Variable | Default | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | — | Required for AI review |
| `ANTHROPIC_MODEL` | `claude-opus-5-5` | Use `claude-sonnet-5-5` or `claude-haiku-5-5` for lower cost |
| `ANTHROPIC_EFFORT` | `low` | Thinking depth (`low`…`max`); set empty for models without effort support |
| `ACCESS_CODE` | unset | If set, students must enter this code once per browser session |
| `REVIEW_RATE_LIMIT` | `5` | Reviews per IP per 10 minutes |
| `REVIEW_DAILY_LIMIT` | `300` | Reviews per day per server instance |
| `ALLOWED_ORIGINS` | unset | Extra origins (comma-separated) allowed to call the endpoint |

## Without AI review

`index.html` can still be opened directly or hosted as a static GitHub Pages site. All training modes work, but AI review needs the Node server or Vercel because GitHub Pages cannot run server code or store an API key.

## Deployment

### GitHub Pages — static trainer

`.github/workflows/deploy-pages.yml` publishes `index.html` and `supplemental-questions.js` after every push to `main`.

1. Push the project to GitHub.
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the source.

### Vercel — trainer with AI review

`vercel.json` and `api/evaluate.js` create the `/api/evaluate` serverless endpoint automatically.

1. Import the GitHub repository in Vercel.
2. In **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` (and optionally the variables above).
3. Deploy. Use the Vercel URL for the full version with AI review.

## Abuse protection

The review endpoint spends your API credits, so it is protected by:

- an origin check (only the site itself, or `ALLOWED_ORIGINS`, may call it from a browser);
- a per-IP rate limit and a daily cap (`REVIEW_RATE_LIMIT`, `REVIEW_DAILY_LIMIT`);
- request and essay size limits;
- an optional shared `ACCESS_CODE`.

On Vercel the counters live in memory of each serverless instance, so the limits are best-effort. For a public site, set `ACCESS_CODE` and a spending limit in the Anthropic Console.

## Tests

`npm test` runs the backend tests against a local mock of the Claude API (no key or network needed).

## Important note

The Human or AI result is a writing-pattern heuristic, not proof of authorship. Typing-integrity signals (blocked paste attempts, sudden large insertions, tab switches) are likewise advisory. Use them as feedback, not as an accusation or grading decision.

## Security

- Never commit `.env` or a real API key.
- Commit `.env.example` only; it documents the variables without secrets.
- If a key is exposed, revoke it and create a new one immediately.

## License

MIT — see [LICENSE](LICENSE).
