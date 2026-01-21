import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ARC_DIR = path.join(__dirname, "../src/content/architecture");

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run new-architecture "System Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const filePath = path.join(ARC_DIR, `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: Path already exists at ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title} Architecture"
---

## Diagram
<Diagram src="/diagrams/${slug}.svg" />

## Core Components
- [Component A]
- [Component B]

## Invariants
- [Invariant 1]
- [Invariant 2]

## Key Decisions
- [Decision 1]
- [Decision 2]

## Failure Modes
- [Failure 1]
- [Failure 2]
`;

if (!fs.existsSync(ARC_DIR)) {
  fs.mkdirSync(ARC_DIR, { recursive: true });
}

fs.writeFileSync(filePath, template);
console.log(
  `\x1b[32mSUCCESS:\x1b[0m Created new architecture blueprint at ${filePath}`,
);
