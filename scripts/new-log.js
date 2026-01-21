import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../src/content/logs");

const title = process.argv[2];
if (!title) {
  console.error('Usage: npm run new-log "System Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const date = new Date().toISOString().split("T")[0];
const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`Error: Path already exists at ${filePath}`);
  process.exit(1);
}

const template = `---
title: "${title}"
date: "${date}"
description: "Brief summary of the system and its impact."
tags: ["System", "Architecture"]
---

# Context
[Describe the background and why this system was needed.]

# Problem
[Identify the core challenge or bottleneck being addressed.]

# Why existing solutions failed
[Explain why standard tools or approaches were insufficient.]

# System design
[High-level overview of the proposed solution.]

# Architecture
[Technical breakdown of components and data flow.]

# Trade-offs
[Honest assessment of what was sacrificed for what gain.]

# What broke
[Document failures, bugs, or unexpected behavior during development.]

# What was learned
[Key takeaways for future self and the team.]

# Result
[The final state and measurable outcome.]
`;

fs.writeFileSync(filePath, template);
console.log(`\x1b[32mSUCCESS:\x1b[0m Created new log at ${filePath}`);
