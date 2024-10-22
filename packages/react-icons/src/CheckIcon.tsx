// packages/react-icons/src/CheckIcon.tsx
import React from "react";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = "#000",
  className = "",
}) => {
  return (
    <svg
      className={`icon-check ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
