import React from "react";

export interface Props {
  size: number;
  color: string;
}

export const Die: React.FC<Props> = ({ size, color }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-27.532 -62.308)">
        <path
          className="transition-all"
          d="m37.529 62.308c-5.5387 0-9.9973 4.4259-9.9973 9.9233v30.154c0 5.4974 4.4587 9.9229 9.9973 9.9229h30.005c5.5387 0 9.9973-4.4254 9.9973-9.9229v-30.154c0-5.4974-4.4587-9.9233-9.9973-9.9233zm1.4785 6.1499a5.4671 5.4264 0 0 1 5.4668 5.4266 5.4671 5.4264 0 0 1-5.4668 5.4266 5.4671 5.4264 0 0 1-5.4673-5.4266 5.4671 5.4264 0 0 1 5.4673-5.4266zm27.048 0a5.4671 5.4264 0 0 1 5.4673 5.4266 5.4671 5.4264 0 0 1-5.4673 5.4266 5.4671 5.4264 0 0 1-5.4668-5.4266 5.4671 5.4264 0 0 1 5.4668-5.4266zm-13.524 13.424a5.4671 5.4264 0 0 1 5.4668 5.4266 5.4671 5.4264 0 0 1-5.4668 5.4261 5.4671 5.4264 0 0 1-5.4673-5.4261 5.4671 5.4264 0 0 1 5.4673-5.4266zm-13.524 13.424a5.4671 5.4264 0 0 1 5.4668 5.4261 5.4671 5.4264 0 0 1-5.4668 5.4266 5.4671 5.4264 0 0 1-5.4673-5.4266 5.4671 5.4264 0 0 1 5.4673-5.4261zm27.048 0a5.4671 5.4264 0 0 1 5.4673 5.4261 5.4671 5.4264 0 0 1-5.4673 5.4266 5.4671 5.4264 0 0 1-5.4668-5.4266 5.4671 5.4264 0 0 1 5.4668-5.4261z"
          fill={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};