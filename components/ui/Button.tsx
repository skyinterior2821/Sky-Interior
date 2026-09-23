import React from "react";
import Link from "next/link";

const variantStyles = {
  primary: "bg-[var(--color-accent)] text-[var(--color-ink)] hover:bg-[var(--color-accent-hover)]",
  secondary: "bg-[var(--color-ink-soft)] text-[var(--color-surface)] hover:bg-[var(--color-ink)]",
  outline: "border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-ink-soft)] hover:text-[var(--color-surface)] text-[var(--color-text)]",
  ghost: "hover:bg-[var(--color-surface-muted)] text-[var(--color-text)]",
  link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
  light: "bg-[var(--color-surface)] text-[var(--color-ink)] hover:bg-[var(--color-surface-elevated)]",
};

const sizeStyles = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-[var(--radius-sm)] px-3 text-xs",
  lg: "h-12 rounded-[var(--radius-lg)] px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  fullWidth?: boolean;
  href?: string;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", fullWidth = false, href, isLoading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium ring-offset-[var(--color-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans tracking-widest uppercase";
    
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`;

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={combinedClassName}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
