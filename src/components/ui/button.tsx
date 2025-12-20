import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-border bg-transparent hover:bg-muted hover:border-accent/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted/50",
        link: "text-accent underline-offset-4 hover:underline",
        // NEW: Premium CTA variants
        glow: "bg-accent text-accent-foreground font-bold shadow-button hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]",
        "glow-outline": "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground hover:shadow-glow",
        premium: "bg-gradient-cta text-accent-foreground font-bold shadow-button hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden",
        "premium-dark": "bg-primary text-primary-foreground border border-border/50 hover:border-accent/50 hover:shadow-glow",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<any>;
      return React.cloneElement(child, {
        ...props,
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
        {/* Shimmer effect for premium variant */}
        {variant === "premium" && (
          <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };