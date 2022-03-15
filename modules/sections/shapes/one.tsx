import { BaseShapeProps } from ".";

const One: React.FC<BaseShapeProps> = ({ size, color, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="scale(.26458)"
        d="m94.488 5.3477a89.14 89.14 0 0 0-89.141 89.141 89.14 89.14 0 0 0 89.141 89.141 89.14 89.14 0 0 0 37.795-8.4434v-161.39a89.14 89.14 0 0 0-37.795-8.4434z"
        fill="none"
        stroke={`#${color}${opacity.repeat(2)}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={Math.round(600 / size)}
      />
    </svg>
  );
};

export default One;
