import React from "react";
import { BaseShapeProps } from ".";

const Two: React.FC<BaseShapeProps> = ({ size, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <g transform="translate(37.345 -140.36)">
        <rect
          x="-35.663"
          y="142.05"
          width="46.636"
          height="46.636"
          ry="6.2047"
          fill="none"
          stroke={`#ffffff${opacity.repeat(2)}`}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={Math.round(250 / size)}
        />
      </g>
    </svg>
  );
};

export default Two;
