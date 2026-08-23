interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
  narrow?: boolean;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  narrow = false,
}: ContainerProps) {
  const maxWidth = narrow ? "max-w-[65ch]" : "max-w-[1440px]";

  return (
    <Tag
      className={`mx-auto w-full px-[var(--gutter-mobile)] lg:px-[var(--gutter-desktop)] ${maxWidth} ${className}`}
    >
      {children}
    </Tag>
  );
}
