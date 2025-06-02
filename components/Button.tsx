import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  const defaultClassName =
    "px-6 py-2 rounded-md border border-gray-300 bg-white text-black hover:bg-gray-100 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed";
  return (
    <button
      className={cn(defaultClassName, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
