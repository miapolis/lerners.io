import React from "react";
import { BaseShapeProps } from ".";

const Two: React.FC<BaseShapeProps> = ({ size, color, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.4151"
        y="1.4151"
        width="47.17"
        height="47.17"
        ry="10.563"
        fill="none"
        stroke={`#${color}${opacity.repeat(2)}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={Math.round(250 / size)}
      />
    </svg>
  );
};

export default Two;
