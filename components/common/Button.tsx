import Image from "next/image";
import { cn } from "@/lib/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "active";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  ref?: React.Ref<HTMLButtonElement>;
};

const Button = ({
  children,
  variant = "outline",
  icon,
  iconPosition = "left",
  className,
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 ring-1 rounded-md px-4 py-0 h-8 text-sm transition-colors cursor-pointer",
        variant === "primary" && "text-primary ring-primary",
        variant === "outline" && "text-foreground ring-foreground",
        variant === "active" && "bg-primary text-white ring-primary",
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;