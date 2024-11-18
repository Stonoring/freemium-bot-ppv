// src/components/ui/Button.js
import React from 'react';

const Button = ({ type = "button", variant = "default", size = "md", className = "", disabled = false, onClick, children }) => {
  const baseStyles = "py-2 px-4 rounded transition duration-300";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "text-white hover:bg-[#eb3729]",
  };
  const sizeStyles = {
    md: "text-lg",
    icon: "w-10 h-10 flex items-center justify-center",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
