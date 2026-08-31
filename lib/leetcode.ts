import { tryCatch } from "./try-catch";
import { checkHistory } from "./db"

export type Problem = {
  id: string,
  frontend_id: string,
  title: string,
  title_slug: string,
  difficulty: "Easy" | "Medium" | "Hard",
  url: string
}

export type Difficulty = "Easy" | "Medium" | "Hard";

// https://github.com/noworneverev/leetcode-api
async function randomProblem(difficulty: Difficulty) {
  const { data, error } = await tryCatch(fetch(`https://leetcode-api-pied.vercel.app/random?difficulty=${difficulty}`));
  if (error) {
    return null;
  }
  const response = await data.json() as Problem;
  if (!response) {
    return null;
  }
  return response;
}

export async function getUniqueProblem(difficulty: Difficulty) {
  let problem = await randomProblem(difficulty);

  if (!problem) {
    console.log("Failed to retrieve random problem")
    return
  }

  let exists = await checkHistory(problem.frontend_id);

  // keep getting random problems until it's not been done before
  while (exists) {
    problem = await randomProblem(difficulty);

    if (!problem) {
      console.log("Failed to retrieve random problem")
      return
    }

    exists = await checkHistory(problem.frontend_id);
  }

  return problem;
}
