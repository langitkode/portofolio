import { createFileRoute } from "@tanstack/react-router";
import { Typography } from "../components/ui";
import React, { Suspense } from "react";
import Mermaid from "../components/Mermaid";
import Diagram from "../components/Diagram";
import Interactions from "../components/Interactions";

// Dynamic import map for architectures
const architectures = import.meta.glob("../content/architecture/*.mdx");

export const Route = createFileRoute("/systems/$slug")({
  component: SystemDetail,
});

const components = {
  h1: (props: any) => <Typography variant="h1" {...props} />,
  h2: (props: any) => <Typography variant="h2" {...props} />,
  h3: (props: any) => <Typography variant="h3" {...props} />,
  p: (props: any) => <Typography variant="body" {...props} />,
  Diagram,
  code: (props: any) => {
    if (props.className === "language-mermaid") {
      return <Mermaid chart={props.children} />;
    }
    return <code {...props} />;
  },
};

function SystemDetail() {
  const { slug } = Route.useParams();

  // Find the matching architecture
  const arcPath = `../content/architecture/${slug}.mdx`;
  const ArcContent = React.useMemo(() => {
    if (architectures[arcPath]) {
      return React.lazy(architectures[arcPath] as any);
    }
    return null;
  }, [slug]);

  if (!ArcContent) {
    return (
      <div className="py-24 text-center">
        <Typography variant="h2">Architecture Not Found</Typography>
        <Typography>
          The requested system blueprint is currently under development.
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      <section>
        <Typography
          variant="small"
          className="uppercase tracking-widest font-mono text-brand-muted mb-2"
        >
          SYSTEM_BLUEPRINT
        </Typography>
        <Typography variant="h1" className="mb-0">
          {slug
            .split("-")
            .map((word) => word.charAt(0) + word.slice(1))
            .join(" ")}
        </Typography>
      </section>

      <Suspense
        fallback={
          <div className="animate-pulse bg-brand-border/20 h-96 rounded-lg" />
        }
      >
        <article className="prose-minimal">
          <ArcContent components={components} />
        </article>
      </Suspense>

      <Interactions slug={`arc-${slug}`} />
    </div>
  );
}
