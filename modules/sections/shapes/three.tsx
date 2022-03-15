import { BaseShapeProps } from ".";

const Three: React.FC<BaseShapeProps> = ({ size, color, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        transform="matrix(.20948 0 0 .20948 8.9088 42.879)"
        d="m175.26-28.513-196.89-1e-6 98.444-170.51z"
        fill="none"
        stroke={`#${color}${opacity.repeat(2)}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={Math.round(1200 / size)}
      />
    </svg>
  );
};

export default Three;
