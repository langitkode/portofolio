import { Link } from "react-router-dom";
import { Typography } from "../components/ui";

const logModules = import.meta.glob("../content/logs/*.mdx", { eager: true });
const arcModules = import.meta.glob("../content/architecture/*.mdx", {
  eager: false,
});

export default function Systems() {
  const systems = Object.entries(logModules)
    .map(([path, mod]: [string, any]) => {
      const slug = path.split("/").pop()?.replace(".mdx", "") || "";
      const frontmatter = mod.frontmatter || {};

      // Check if there is a corresponding architecture file
      const arcPath = `../content/architecture/${slug}.mdx`;
      const hasArchitecture = !!arcModules[arcPath];

      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || "",
        hasArchitecture,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <div className="space-y-12">
      <section>
        <Typography variant="h1">System Architecture</Typography>
        <Typography>
          Structural blueprints and decision records for long-term system
          maintainability.
        </Typography>
      </section>

      <section>
        <Typography variant="h2">Purpose</Typography>
        <Typography>
          This section documents the architectural foundations of systems I've
          built.
        </Typography>
        <Typography>
          It exists for one reason: to make future decisions easier by
          preserving the reasoning behind past ones.
        </Typography>
        <Typography>
          I treat architecture as a record of constraints, trade-offs, and
          intent — not as a static diagram, but as a living system log.
        </Typography>
      </section>

      <section>
        <Typography variant="h2">What You'll Find Here</Typography>

        <div className="space-y-8">
          <div>
            <Typography variant="h3">1. Architecture Blueprints</Typography>
            <Typography>
              High-level diagrams that describe how systems are composed, how
              data flows, and where boundaries are enforced.
            </Typography>
            <Typography variant="small" className="italic">
              These diagrams are not for presentation — they are for
              maintenance.
            </Typography>
          </div>

          <div>
            <Typography variant="h3">2. Decision Records (ADR)</Typography>
            <Typography>
              Every major technical decision is documented with:
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-brand-text mb-4 ml-2">
              <li>context</li>
              <li>alternatives considered</li>
              <li>decision taken</li>
              <li>consequences</li>
            </ul>
            <Typography variant="small" className="italic">
              This prevents accidental rewrites and repeated mistakes.
            </Typography>
          </div>

          <div>
            <Typography variant="h3">3. Invariants & Constraints</Typography>
            <Typography>
              Rules that must never be violated for the system to remain stable.
            </Typography>
            <ul className="list-disc list-inside space-y-1 text-brand-text mb-4 ml-2">
              <li>state must be the source of truth</li>
              <li>generators must be deterministic</li>
              <li>systems must be operable by non-developers</li>
              <li>infrastructure must remain zero-cost when possible</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <Typography variant="h2">Systems Documented</Typography>
        <ul className="space-y-4 list-none p-0">
          {systems.map((system, i) => (
            <li key={system.slug} className="group">
              {system.hasArchitecture ? (
                <Link
                  to={`/systems/${system.slug}`}
                  className="flex gap-4 hover:opacity-70 transition-opacity"
                >
                  <span className="font-mono text-brand-muted text-sm mt-1 group-hover:text-brand-text transition-colors">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <Typography variant="body" className="mb-0 font-medium">
                      {system.title} [SCHEMA]
                    </Typography>
                    <Typography variant="small">
                      {system.description}
                    </Typography>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-4 opacity-50">
                  <span className="font-mono text-brand-muted text-sm mt-1">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <Typography variant="body" className="mb-0 font-medium">
                      {system.title}
                    </Typography>
                    <Typography variant="small">
                      Blueprint in progress.
                    </Typography>
                  </div>
                </div>
              )}
            </li>
          ))}
          <li className="flex gap-4">
            <span className="font-mono text-brand-muted text-sm mt-1">--</span>
            <div>
              <Typography variant="body" className="mb-0 font-medium">
                Shared Patterns
              </Typography>
              <Typography variant="small">
                Reusable architectural decisions across systems.
              </Typography>
            </div>
          </li>
        </ul>
      </section>

      <section className="pb-12">
        <Typography variant="h2">Philosophy</Typography>
        <Typography className="italic">
          Structure always precedes implementation.
        </Typography>
        <Typography>
          When structure is clear, implementation becomes mechanical. When
          structure is missing, no amount of code can save the system.
        </Typography>
      </section>
    </div>
  );
}
