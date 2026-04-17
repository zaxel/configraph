import { ReactNode, ElementType } from "react";
import { TextType } from "../../model";

type TextProps = {
  variant: TextType;
  children: ReactNode;
};

const tagMap: Record<TextType, ElementType<{ className?: string; children?: ReactNode }>> = {
  heading1: "h2",
  heading2: "h3",
  "text-sm": "p",
  "text-md": "p",
  "text-md-gray": "p",
  button: "button",
};

const textStyles: Record<TextType, string> = {
  heading1: "text-2xl font-semibold",
  heading2: "text-xl font-medium",
  "text-sm": "text-sm",
  "text-md": "text-base",
  "text-md-gray": "text-base font-light text-gray-500",
  button: "text-sm font-medium",
};

export const Text = ({ variant, children }: TextProps) => {
  const Tag = tagMap[variant] || "p";

  return (
    <Tag className={textStyles[variant]}>
      {children}
    </Tag>
  );
};