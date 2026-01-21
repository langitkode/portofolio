import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";
import { Typography } from "./ui";

export default function Interactions({ slug }: { slug: string }) {
  // Convex Logic
  const views = useQuery(api.interactions.getViews, { slug });
  const reactions = useQuery(api.interactions.getReactions, { slug });
  const incrementViewMutation = useMutation(api.interactions.incrementViews);
  const addReactionMutation = useMutation(api.interactions.incrementReaction);

  // Fallback / Local Logic
  const [localViews, setLocalViews] = useState<number>(0);
  const [localLikes, setLocalLikes] = useState<number>(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // 1. Initialize from localStorage
    const storedViews = localStorage.getItem(`views-${slug}`);
    const storedLikes = localStorage.getItem(`likes-${slug}`);

    if (storedViews) setLocalViews(parseInt(storedViews, 10));
    if (storedLikes) setLocalLikes(parseInt(storedLikes, 10));

    // 2. Handle View Increment
    if (!hasIncremented) {
      // Try Convex
      incrementViewMutation({ slug }).catch(() => {
        // Fallback to Local
        const newViews = (storedViews ? parseInt(storedViews, 10) : 0) + 1;
        setLocalViews(newViews);
        localStorage.setItem(`views-${slug}`, newViews.toString());
      });
      setHasIncremented(true);
    }
  }, [slug, incrementViewMutation, hasIncremented]);

  const handleLike = () => {
    // Try Convex
    addReactionMutation({ slug, type: "like" }).catch(() => {
      // Fallback to Local
      const newLikes = localLikes + 1;
      setLocalLikes(newLikes);
      localStorage.setItem(`likes-${slug}`, newLikes.toString());
    });
  };

  // If Convex data is available, use it, otherwise use local fallback
  const displayViews = views !== undefined ? views : localViews;
  const displayLikes =
    reactions?.find((r: any) => r.type === "like")?.count ?? localLikes;

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
          VIEWS: {displayViews}
        </Typography>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleLike}
          className="text-[10px] hover:bg-brand-border/20 transition-colors uppercase tracking-widest font-mono border border-brand-border px-3 py-1 flex items-center gap-2 group"
        >
          <span className="group-hover:scale-110 transition-transform">✦</span>
          REACTION: {displayLikes}
        </button>
      </div>
    </div>
  );
}
