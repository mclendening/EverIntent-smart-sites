import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Default: dark button
        default: "bg-primary text-primary-foreground border border-border/30 hover:bg-primary-light rounded",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded",
        outline: "bg-transparent text-foreground border border-border/50 hover:bg-muted/30 hover:border-accent/30 rounded",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded",
        ghost: "hover:bg-muted/50 rounded",
        link: "text-accent underline-offset-4 hover:underline",
        // Gold CTA button
        gold: "bg-accent text-accent-foreground font-medium hover:brightness-90 shadow-button rounded",
        // Outlined gold button
        "gold-outline": "bg-transparent text-accent border border-accent/50 hover:bg-accent/10 hover:border-accent rounded",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-4 py-2 text-xs",
        lg: "px-6 py-3",
        xl: "px-8 py-3.5 text-base",
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
