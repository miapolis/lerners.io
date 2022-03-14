import { BaseShapeProps } from ".";

const One: React.FC<BaseShapeProps> = ({ size, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <g transform="translate(37.526 -139.91)">
        <g transform="matrix(1.0334 0 0 1.0006 -7.1675 -40.475)" fill="none">
          <path
            d="m19.006 205.26a23.398 23.398 0 0 1-23.398 23.398 23.398 23.398 0 0 1-23.398-23.398 23.398 23.398 0 0 1 23.398-23.398 23.398 23.398 0 0 1 23.398 23.398z"
            stroke-opacity="0"
          />
          <path
            transform="matrix(.26458 0 0 .26458 42.627 140.4)"
            d="m-177.71 156.71a88.432 88.432 0 0 0-88.432 88.432 88.432 88.432 0 0 0 88.432 88.432 88.432 88.432 0 0 0 28.738-4.8633v-167.2a88.432 88.432 0 0 0-28.738-4.8027z"
            stroke={`#ffffff${opacity.repeat(2)}`}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={Math.round(600 / size)}
          />
        </g>
      </g>
    </svg>
  );
};

export default One;
