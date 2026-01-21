import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getReactions = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reactions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();
  },
});

export const incrementReaction = mutation({
  args: { slug: v.string(), type: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("type"), args.type))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { count: existing.count + 1 });
    } else {
      await ctx.db.insert("reactions", {
        slug: args.slug,
        type: args.type,
        count: 1,
      });
    }
  },
});

export const getViews = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const views = await ctx.db
      .query("pageViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return views?.hits ?? 0;
  },
});

export const incrementViews = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("pageViews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { hits: existing.hits + 1 });
    } else {
      await ctx.db.insert("pageViews", {
        slug: args.slug,
        hits: 1,
      });
    }
  },
});
