import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import { Typography } from "./ui";

export default function Interactions({ slug }: { slug: string }) {
  const views = useQuery(api.interactions.getViews, { slug });
  const reactions = useQuery(api.interactions.getReactions, { slug });
  const incrementView = useMutation(api.interactions.incrementViews);
  const addReaction = useMutation(api.interactions.incrementReaction);

  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    if (!hasIncremented) {
      incrementView({ slug });
      setHasIncremented(true);
    }
  }, [slug, incrementView, hasIncremented]);

  const likeCount = reactions?.find((r: any) => r.type === "like")?.count ?? 0;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full mt-12">
      <div className="space-y-1">
        <Typography
          variant="small"
          className="mb-0 uppercase tracking-widest font-mono"
        >
          SYS_REF: {slug.toUpperCase()}
        </Typography>
        <Typography variant="small" className="mb-0 opacity-50 font-mono">
          VIEWS: {views !== undefined ? views : "-"}
        </Typography>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => addReaction({ slug, type: "like" })}
          className="text-[10px] hover:bg-brand-border/20 transition-colors uppercase tracking-widest font-mono border border-brand-border px-3 py-1 flex items-center gap-2 group"
        >
          <span className="group-hover:scale-110 transition-transform">✦</span>
          REACTION: {likeCount}
        </button>
      </div>
    </div>
  );
}
