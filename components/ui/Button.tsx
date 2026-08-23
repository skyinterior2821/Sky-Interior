import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "outline";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans text-sm tracking-wide uppercase px-8 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  const variants = {
    primary:
      "bg-ink text-surface hover:bg-accent-deep disabled:opacity-50 disabled:cursor-not-allowed",
    outline:
      "border border-ink text-ink hover:bg-ink hover:text-surface disabled:opacity-50 disabled:cursor-not-allowed",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
