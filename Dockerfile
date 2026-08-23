FROM oven/bun:1

RUN apt-get update \
    && apt-get install -y --no-install-recommends tzdata \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ENV NODE_ENV=production \
    DB_PATH=/app/data/leetcode.sqlite

VOLUME ["/app/data"]

CMD ["bun", "run", "index.ts"]
