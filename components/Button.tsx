import React from "react";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const Button = ({ onClick, disabled }: ButtonProps) => (
  <button
    onClick={onClick}
    className="flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
    disabled={disabled}
  >
    <span>{disabled ? "Loading" : "Send magic link"}</span>
  </button>
);

export default Button;
