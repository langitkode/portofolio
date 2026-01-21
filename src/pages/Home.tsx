import { Typography } from "../components/ui";
import focusData from "../data/focus.json";

export default function Home() {
  return (
    <div className="space-y-12">
      <section>
        <Typography variant="h1">The System Is the Product</Typography>
        <Typography>I am a Product Systems Engineer.</Typography>
        <Typography>
          I don't just build features. I design engines, pipelines, and
          generators that make products scale beyond manual work. Most of my
          projects started as a single idea and became systems used by real
          people: planners, internal tools, content platforms, and automation
          engines.
        </Typography>
        <Typography>This site is my public lab.</Typography>
        <Typography>
          Here I document systems I've built, the decisions behind them, and the
          trade-offs I accepted. Not as success stories, but as engineering
          records.
        </Typography>
      </section>

      <section>
        <Typography variant="h2">Principles</Typography>
        <div className="space-y-8">
          <div>
            <Typography variant="h3">{"Ownership > Speed"}</Typography>
            <Typography>
              I move fast, but never at the cost of understanding. A system I
              don't fully own will eventually break me.
            </Typography>
          </div>
          <div>
            <Typography variant="h3">{"Readability > Beauty"}</Typography>
            <Typography>
              Code is read more than it is written. If a system looks beautiful
              but cannot be understood quickly, it is already failing.
            </Typography>
          </div>
          <div>
            <Typography variant="h3">{"Longevity > Tools"}</Typography>
            <Typography>
              Frameworks change. Products remain. I design systems that survive
              tool churn and hype cycles.
            </Typography>
          </div>
        </div>
      </section>

      <section>
        <Typography variant="h2">The Lab</Typography>
        <Typography>
          This is not a portfolio. It is a growing knowledge base of real
          systems:
        </Typography>
        <ul className="list-disc list-inside space-y-2 mb-8 text-brand-text">
          <li>planning engines (KRSan)</li>
          <li>automation pipelines (Web-Factory)</li>
          <li>content platforms (Headroom Journal)</li>
          <li>internal operations tools (TrainHub)</li>
          <li>experimental AI-driven systems (HARIS)</li>
        </ul>
        <Typography>
          Every build log documents: what worked, what failed, and what I would
          do differently.
        </Typography>

        <div className="mt-12 p-6 bg-brand-border/10 border border-brand-border rounded-lg">
          <Typography variant="small" className="italic mb-0">
            "A senior engineer is someone who has made enough mistakes to
            recognize them before they happen.
            <br />
            This lab is where I record mine."
          </Typography>
        </div>
      </section>

      <section>
        <Typography variant="h2">Current Focus</Typography>
        <div className="grid gap-6">
          {focusData.map((item: any, i: number) => (
            <div
              key={i}
              className="p-6 border border-brand-border hover:bg-brand-border/10 transition-colors"
            >
              <Typography variant="body" className="mb-2 font-semibold">
                {item.title}
              </Typography>
              <Typography
                variant="body"
                className="text-sm mb-4 leading-relaxed"
              >
                {item.summary}
              </Typography>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.stack.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-wider font-mono bg-brand-border/30 px-2 py-0.5 rounded text-brand-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Typography
                variant="small"
                className="text-xs opacity-60 font-mono"
              >
                APPLIED_IN: {item.applied_in.join(", ")}
              </Typography>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
