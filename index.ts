import { getUniqueProblem } from "./lib/leetcode"
import type { Difficulty } from "./lib/leetcode"
import { addToHistory } from "./lib/db"
import { dontIndent } from "./lib/dedent"
import { postToDiscord } from "./lib/webhook"

async function getDifficulty(): Promise<Difficulty> {
  let d = new Date();
  let day = d.getDay();
  // 0 - 6 = Sunday - Saturday
  if (day == 5 || day == 6) {
    return 'Medium'
  }
  return 'Easy'
}

async function dailyJob() {
  let difficulty = await getDifficulty();
  let problem = await getUniqueProblem(difficulty);

  if (!problem) {
    console.log("Failed to retrieve random problem")
    return false;
  }

  const webhookContent = dontIndent(`# #${problem.frontend_id} -- ${problem.title}
  ${problem.difficulty}\n
  🔗[Solve it here](${problem.url})\n
  > Answer it in the thread! 🧵`)

  postToDiscord(webhookContent);
  addToHistory(problem.frontend_id);
}

Bun.cron("0 9 * * *", async () => {
  dailyJob();
}, { tz: "Australia/Sydney" });
