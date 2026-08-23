# leetcode-cron-job

Posts a random "Easy" LeetCode problem to Discord every day at 9:00 AM.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Marking problems as completed

The cron job skips problems that are already recorded in the local history. Add
problem IDs (the numbers shown on LeetCode) that you've already completed so
they won't be posted again.

Add one or more IDs on the command line (space or comma separated):

```bash
bun run add_history.ts 925 926 927
bun run add_history.ts 925,926,927
```

Or add many at once from a file (one ID per line, or space/comma separated):

```bash
bun run add_history.ts --file completed.txt
```

IDs are validated and duplicates are ignored.

## Docker

```bash
docker compose up -d --build
```

The webhook URL is read from your `.env` file (or set `DISCORD_WEBHOOK_URL` in
the environment). The SQLite database is persisted in a named volume.

The container defaults to UTC. To fire at 9:00 AM in your local timezone, set
`TZ` in `.env` (e.g. `TZ=America/New_York`) or pass `-e TZ=...`.

To add completed IDs inside a running container:

```bash
docker compose exec leetcode-cron bun run add_history.ts 925 926 927
```
