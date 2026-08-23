import { Database } from "bun:sqlite";

const db = new Database(process.env.DB_PATH ?? "leetcode.sqlite", { create: true });

db.run(`
  CREATE TABLE IF NOT EXISTS history (
    leetcode_id VARCHAR PRIMARY KEY
  )
`);

export async function checkHistory(id: string) {
  const query = db.query(`SELECT 1 FROM history WHERE leetcode_id = ?`);

  return !!query.get(id);
}

export async function addToHistory(id: string) {
  db.run("INSERT OR IGNORE INTO history (leetcode_id) VALUES (?)", [id]);
}

export async function addToHistoryBulk(ids: string[]) {
  const insertMany = db.transaction((items: string[]) => {
    for (const id of items) {
      db.run("INSERT OR IGNORE INTO history (leetcode_id) VALUES (?)", [id]);
    }
  });

  insertMany(ids);
}

export async function viewHistory() {
  const query = db.query(`SELECT * FROM history`);

  console.log(query.all());
}
