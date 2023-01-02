import React from "react";
import { BaseIconProps } from ".";

export const VercelIcon: React.FC<BaseIconProps> = ({
  className,
  size = 24,
}) => {
  return (
    <svg
      className={className}
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  );
};
