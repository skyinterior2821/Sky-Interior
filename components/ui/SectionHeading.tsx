interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  heading,
  subheading,
  as: Tag = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <Tag className="font-serif text-[length:var(--text-h2)] lg:text-[length:var(--text-h1)]">
        {heading}
      </Tag>
      {subheading && (
        <p className="mt-4 text-[length:var(--text-lg)] text-ink-muted max-w-[50ch]">
          {subheading}
        </p>
      )}
    </div>
  );
}
