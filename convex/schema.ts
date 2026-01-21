import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  reactions: defineTable({
    slug: v.string(),
    type: v.string(), // "like", "system-check", etc.
    count: v.number(),
  }).index("by_slug", ["slug"]),

  pageViews: defineTable({
    slug: v.string(),
    hits: v.number(),
  }).index("by_slug", ["slug"]),
});
