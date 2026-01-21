import React from "react";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`container-tight ${className}`}>{children}</div>;
}

export function Typography({
  children,
  variant = "body",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "body" | "small" | "mono";
  className?: string;
}) {
  const variants = {
    h1: "text-2xl font-semibold tracking-tight",
    h2: "text-xl font-medium tracking-tight mt-12 mb-4",
    h3: "text-lg font-medium mt-8 mb-2",
    body: "text-base leading-relaxed text-brand-text mb-4",
    small: "text-sm text-brand-muted",
    mono: "font-mono text-sm bg-brand-border/50 px-1 rounded-sm",
  };

  if (variant === "h1")
    return <h1 className={`${variants.h1} ${className}`}>{children}</h1>;
  if (variant === "h2")
    return <h2 className={`${variants.h2} ${className}`}>{children}</h2>;
  if (variant === "h3")
    return <h3 className={`${variants.h3} ${className}`}>{children}</h3>;
  if (variant === "small")
    return (
      <small className={`${variants.small} ${className}`}>{children}</small>
    );
  if (variant === "mono")
    return <code className={`${variants.mono} ${className}`}>{children}</code>;

  return <p className={`${variants.body} ${className}`}>{children}</p>;
}
