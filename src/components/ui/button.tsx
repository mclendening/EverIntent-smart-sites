import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default: minimal dark button
        default: "bg-secondary text-foreground border border-border/30 hover:border-border/50 hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "bg-transparent text-foreground border border-border/30 hover:border-accent/30",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        ghost: "hover:bg-muted/30",
        link: "text-accent underline-offset-4 hover:underline",
        // Primary gold CTA
        glow: "bg-accent text-accent-foreground font-medium hover:bg-accent-hover hover:shadow-glow",
        "glow-outline": "bg-transparent text-accent border border-accent/30 hover:bg-accent/10 hover:border-accent/50",
        // Premium - solid gold
        premium: "bg-accent text-accent-foreground font-medium hover:bg-accent-hover hover:shadow-glow",
        "premium-dark": "bg-secondary text-foreground border border-border/30 hover:border-accent/30",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3",
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
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
