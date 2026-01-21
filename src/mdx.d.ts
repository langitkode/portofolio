declare module "*.mdx" {
  import { FC, PropsWithChildren } from "react";
  const content: FC<PropsWithChildren>;
  export default content;

  export const frontmatter: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
  };
}
