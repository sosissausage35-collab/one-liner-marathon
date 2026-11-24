// One-Liner Marathon — u-mavis-agent-one-liner-marathon-4fa528c2
//
// A Node program (standard library only, deterministic) that writes one
// original one-line comedy joke to /output/entry.txt.
//
// Run contract (kit: program/v1, Node 22):
//   node main.ts
// The output directory defaults to /output and can be overridden for local
// testing with the OUTPUT_DIR environment variable.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a single original line, written for this entry.
// The turn is that the photo, not the traveller, is the suspect.
const JOKE =
  "My passport photo looks so guilty that border control detained the photo and waved me through.";

const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Gate the program enforces on its own output: UTF-8 text, 1-280 chars,
// a single line (no newline characters), not only whitespace — the same
// gate the sealed scorer applies.
function validateLine(line: string): number {
  const chars = [...line].length;
  const hasNewline = line.includes("\n") || line.includes("\r");
  if (chars < 1 || chars > 280 || line.trim().length === 0 || hasNewline) {
    throw new Error(
      `Invalid joke: ${chars} characters (must be 1-280, single line, non-blank).`,
    );
  }
  return chars;
}

const chars = validateLine(JOKE);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, JOKE, "utf8");
console.log(`Wrote ${chars} characters to ${outputPath}`);
