import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary/95 backdrop-blur-sm text-primary-foreground border border-border/30 shadow-lg hover:bg-primary hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground border border-destructive/30 shadow-lg hover:bg-destructive/90",
        outline: "bg-transparent border border-border/50 hover:bg-muted/50 hover:border-accent/50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-secondary/95 backdrop-blur-sm text-secondary-foreground border border-border/30 shadow-lg hover:bg-secondary hover:border-accent/50",
        ghost: "hover:bg-muted/50",
        link: "text-accent underline-offset-4 hover:underline",
        // Premium CTA variants matching chat button pattern
        glow: "bg-accent/95 backdrop-blur-sm text-accent-foreground font-semibold border border-accent/30 shadow-lg hover:bg-accent hover:border-accent hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0",
        "glow-outline": "bg-transparent border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent shadow-lg hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0",
        premium: "bg-gradient-cta backdrop-blur-sm text-accent-foreground font-semibold border border-accent/30 shadow-lg hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden",
        "premium-dark": "bg-primary/95 backdrop-blur-sm text-primary-foreground border border-border/30 hover:border-accent/50 shadow-lg hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-6",
        xl: "h-12 px-8 text-base",
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