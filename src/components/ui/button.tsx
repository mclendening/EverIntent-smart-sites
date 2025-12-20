import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium tracking-wide ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA: Solid amber with dark text (like "Get Started" / "Book a Call")
        default: "bg-accent text-primary font-semibold shadow-md hover:shadow-lg hover:brightness-110 active:brightness-95",
        destructive: "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
        outline: "bg-transparent text-foreground border border-border/50 hover:bg-muted/30 hover:border-accent/50",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-muted/50",
        link: "text-accent underline-offset-4 hover:underline",
        // Alternate CTA styles
        glow: "bg-accent text-primary font-semibold shadow-md hover:shadow-lg hover:shadow-accent/30 hover:brightness-110",
        "glow-outline": "bg-transparent text-accent border border-accent/50 hover:bg-accent/10 hover:border-accent",
        premium: "bg-accent text-primary font-semibold shadow-md hover:shadow-lg hover:shadow-accent/30 hover:brightness-110",
        "premium-dark": "bg-primary/95 backdrop-blur-sm text-primary-foreground border border-accent/30 shadow-lg hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20",
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