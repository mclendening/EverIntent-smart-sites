import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary/95 backdrop-blur-sm border border-accent/30 shadow-lg text-primary-foreground hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20",
  {
    variants: {
      variant: {
        default: "",
        destructive: "bg-destructive/95 text-destructive-foreground border-destructive/30 hover:bg-destructive hover:border-destructive hover:shadow-destructive/20",
        outline: "bg-transparent text-foreground border-border/50 hover:bg-muted/30 hover:border-accent/50 hover:shadow-accent/10",
        secondary: "bg-secondary/95 text-secondary-foreground border-border/30 hover:bg-secondary hover:border-accent/50 hover:shadow-accent/10",
        ghost: "bg-transparent border-transparent shadow-none hover:bg-muted/50 hover:border-transparent hover:shadow-none",
        link: "bg-transparent border-transparent shadow-none text-accent underline-offset-4 hover:underline hover:bg-transparent hover:border-transparent hover:shadow-none",
        glow: "bg-accent/95 text-accent-foreground border-accent/50 hover:bg-accent hover:border-accent",
        "glow-outline": "bg-transparent text-accent border-accent/50 hover:bg-accent/10 hover:border-accent",
        premium: "bg-gradient-cta text-accent-foreground border-accent/50 hover:border-accent relative overflow-hidden",
        "premium-dark": "",
      },
      size: {
        default: "h-auto px-5 py-3",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3.5",
        xl: "px-8 py-4 text-base",
        icon: "h-10 w-10 p-0",
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