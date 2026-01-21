import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/ui";
import React, { Suspense } from "react";
import Mermaid from "../components/Mermaid";
import Diagram from "../components/Diagram";
import Interactions from "../components/Interactions";

// Dynamic import map for logs
const logs = import.meta.glob("../content/logs/*.mdx");

export const Route = createFileRoute("/logs/$slug")({
  component: LogDetail,
});

const components = {
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  p: (props: any) => <Typography variant="body" {...props} />,
  Diagram,
  code: (props: any) => {
    // Intercept mermaid blocks
    if (props.className === "language-mermaid") {
      return <Mermaid chart={props.children} />;
    }
    return <code {...props} />;
  },
};

function LogDetail() {
  const { slug } = Route.useParams();

  // Find the matching log
  const logPath = `../content/logs/${slug}.mdx`;
  const LogContent = React.useMemo(() => {
    if (logs[logPath]) {
      return React.lazy(logs[logPath] as any);
    }
    return null;
  }, [slug]);

  if (!LogContent) {
    return (
      <div className="py-24 text-center">
        <Typography variant="h2">Log Not Found</Typography>
        <Typography>
          The requested system log does not exist in the lab.
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <Suspense
        fallback={
          <div className="animate-pulse bg-brand-border/20 h-96 rounded-lg" />
        }
      >
        <article className="prose-minimal">
          <LogContent components={components} />
        </article>
      </Suspense>

      <Interactions slug={`log-${slug}`} />
    </div>
  );
}
