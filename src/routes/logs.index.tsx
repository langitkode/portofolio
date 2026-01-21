import { createFileRoute, Link } from "@tanstack/react-router";
import { Typography } from "../components/ui";

// Eagerly import MDX modules to get frontmatter
const logModules = import.meta.glob("../content/logs/*.mdx", { eager: true });

export const Route = createFileRoute("/logs/")({
  component: LogsIndex,
});

function LogsIndex() {
  const logs = Object.entries(logModules)
    .map(([path, mod]: [string, any]) => {
      const slug = path.split("/").pop()?.replace(".mdx", "") || "";
      const frontmatter = mod.frontmatter || {};
      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || "2026-01-01",
        description: frontmatter.description || "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="h1">Build Logs</Typography>
        <Typography>
          Technical documentation of systems built, failures encountered, and
          lessons learned.
        </Typography>
      </section>

      <div className="space-y-8">
        {logs.map((log) => (
          <Link
            key={log.slug}
            to="/logs/$slug"
            params={{ slug: log.slug }}
            className="block group"
          >
            <div className="border-l-2 border-brand-border group-hover:border-brand-text pl-6 py-2 transition-colors">
              <Typography
                variant="small"
                className="mb-2 uppercase tracking-widest font-mono text-xs opacity-60"
              >
                {log.date}
              </Typography>
              <Typography
                variant="h3"
                className="mt-0 group-hover:opacity-70 transition-opacity"
              >
                {log.title}
              </Typography>
              <Typography
                variant="small"
                className="text-brand-muted line-clamp-2"
              >
                {log.description}
              </Typography>
            </div>
          </Link>
        ))}
        {logs.length === 0 && (
          <Typography variant="small" className="italic opacity-50">
            No logs found in the lab metadata.
          </Typography>
        )}
      </div>
    </div>
  );
}
