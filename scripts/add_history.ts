import { addToHistoryBulk } from "../lib/db";

function parseIds(raw: string[]): string[] {
  return raw
    .flatMap((arg) => arg.split(/[,\s]+/))
    .map((id) => id.trim())
    .filter((id) => id.length > 0);
}

function isValidId(id: string): boolean {
  return /^\d+$/.test(id);
}

async function main() {
  const args = process.argv.slice(2);

  const fileFlag = args.indexOf("--file");
  const shortFileFlag = args.indexOf("-f");
  const fileIndex = fileFlag !== -1 ? fileFlag : shortFileFlag;
  const filePath = fileIndex !== -1 ? args[fileIndex + 1] : null;

  let rawIds: string[];
  if (filePath) {
    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }
    const contents = await file.text();
    rawIds = parseIds(contents.split(/\r?\n/));
  } else {
    rawIds = parseIds(args);
  }

  if (rawIds.length === 0) {
    console.error(
      "No IDs provided.\n\nUsage:\n  bun run add_history.ts <id...>\n  bun run add_history.ts --file <path>"
    );
    process.exit(1);
  }

  const invalid = rawIds.filter((id) => !isValidId(id));
  if (invalid.length > 0) {
    console.error(`Invalid IDs (must be positive integers): ${invalid.join(", ")}`);
    process.exit(1);
  }

  await addToHistoryBulk(rawIds);
  console.log(`Added ${rawIds.length} problem(s) to history: ${rawIds.join(", ")}`);
}

await main();
