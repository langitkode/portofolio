export default function Diagram({
  src,
  alt = "System Diagram",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="my-8 space-y-2">
      <div className="border border-brand-border bg-brand-bg rounded-lg overflow-hidden flex items-center justify-center p-8 bg-[radial-gradient(var(--color-brand-border)_0.5px,transparent_0.5px)] [background-size:12px_12px]">
        {/* If it is a local SVG/Image in public, or an external one */}
        <img src={src} alt={alt} className="max-w-full h-auto" />
      </div>
      <p className="text-[10px] uppercase tracking-widest text-brand-muted font-mono text-center">
        FIG: ARCHITECTURAL_BLUEPRINT
      </p>
    </div>
  );
}
