import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "base",
  themeVariables: {
    primaryColor: "#ffffff",
    primaryTextColor: "#1a1a1a",
    primaryBorderColor: "#eeeeee",
    lineColor: "#666666",
    secondaryColor: "#f9f9f9",
    tertiaryColor: "#ffffff",
  },
});

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Generate a unique ID for each chart
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid flex justify-center my-8" />;
}
