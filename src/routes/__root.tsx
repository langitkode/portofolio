import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import Header from "../components/Header";
import { Container } from "../components/ui";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "PSE LAB | indraprhmbd",
      },
      {
        name: "description",
        content:
          "Technical build logs and architectural blueprints. Documenting systems, decisions, and trade-offs in product engineering.",
      },
      {
        property: "og:title",
        content: "PSE LAB | indraprhmbd",
      },
      {
        property: "og:description",
        content:
          "Detailed engineering records and architecture blueprints for complex systems.",
      },
      {
        property: "og:type",
        content: "website",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        <main className="pb-24">
          <ConvexProvider client={convex}>
            <Container>{children}</Container>
          </ConvexProvider>
        </main>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
