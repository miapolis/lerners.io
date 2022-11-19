export interface LogoIconProps {
  width?: number;
  height?: number;
  bgColor?: string;
  fgColor?: string;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
  width = 24,
  height = 24,
  bgColor = "#000000",
  fgColor = "#ffffff",
}) => {
  return (
    <div
      style={{
        width,
        height,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(-24.331589,-111.73784)">
          <circle
            style={{
              fill: bgColor,
            }}
            cx="74.331589"
            cy="161.73784"
            r="50"
          />
          <path
            style={{
              fill: fgColor,
            }}
            d="m 59.340852,137.72695 v 48.02017 h 1.355221 28.626382 v -7.61249 H 67.452791 V 165.499 h 20.126682 v -7.61248 H 67.452791 v -12.5471 H 88.97347 v -7.61247 z"
          />
        </g>
      </svg>
    </div>
  );
};
