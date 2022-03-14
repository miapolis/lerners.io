import { BaseShapeProps } from ".";

const Three: React.FC<BaseShapeProps> = ({ size, opacity }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      version="1.1"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <g transform="translate(35.393 -142.35)">
        <g transform="matrix(.93238 0 0 .93238 1.1833 10.013)" fill="none">
          <path
            transform="matrix(.37188 0 0 .37188 -35.22 136.45)"
            d="m116.94 118.97h-111.25l55.623-96.342z"
            stroke={`#ffffff${opacity.repeat(2)}`}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={Math.round(600 / size)}
          />
          <circle cx="-12.416" cy="168.75" r="26.813" />
        </g>
      </g>
    </svg>
  );
};

export default Three;
