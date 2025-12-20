import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light shadow-sm hover:shadow-md hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline: "border border-border bg-transparent hover:bg-muted hover:border-accent/50 shadow-sm hover:shadow-md hover:-translate-y-0.5",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-muted/50",
        link: "text-accent underline-offset-4 hover:underline",
        // Premium CTA variants with gentle float
        glow: "bg-accent text-accent-foreground font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        "glow-outline": "border border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
        premium: "bg-gradient-cta text-accent-foreground font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden",
        "premium-dark": "bg-primary text-primary-foreground border border-border/50 hover:border-accent/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6",
        xl: "h-11 px-8 text-base",
        icon: "h-9 w-9",
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