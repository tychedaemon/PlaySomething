import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-95",
          {
            "bg-[#1DB954] text-black hover:bg-[#1ed760] hover:shadow-lg hover:shadow-[#1DB954]/20 hover:-translate-y-0.5":
              variant === "primary",
            "bg-[#151515] text-white border border-[#2a2a2a] hover:bg-[#1f1f1f] hover:border-[#3a3a3a] hover:-translate-y-0.5":
              variant === "secondary",
            "text-white/60 hover:text-white hover:bg-white/5":
              variant === "ghost",
          },
          {
            "h-10 px-4 text-sm": size === "sm",
            "h-12 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
