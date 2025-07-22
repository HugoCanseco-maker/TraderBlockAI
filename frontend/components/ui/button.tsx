// components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ variant = "primary", className = "", ...props }) => {
  const base =
    "px-5 py-2 rounded-xl font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
};
