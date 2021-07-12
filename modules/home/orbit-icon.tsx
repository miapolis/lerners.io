import React from "react";
import styles from "./orbit-icon.module.css";

export interface OrbitIconProps {
  src: string;
  alt: string;
  url: string;
  angle: number;
  accent: string;
  fadeInTime: string;
  initialized: boolean;
}

const OrbitIcon: React.FC<OrbitIconProps> = ({
  src,
  alt,
  url,
  angle,
  accent,
  fadeInTime,
  initialized,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className={styles.orbitParent}>
      <div
        className={styles.orbit}
        style={initialized ? { transform: `rotate(${angle}deg)` } : {}}
      >
        <div
          className={styles.icon}
          style={
            initialized
              ? {
                  transform: `rotate(${angle * -1}deg)`,
                  transition: `transform 0.7s ease-in-out, opacity ${fadeInTime}s ease-out`,
                  opacity: 1,
                }
              : {
                  transition: `transform 0.7s ease-in-out, opacity ${fadeInTime}s ease-out`,
                }
          }
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        >
          <div
            className={styles.iconBackground}
            style={
              hovered
                ? {
                    transform: "translate(-50%, -50%) scale(100%)",
                    backgroundColor: accent,
                    boxShadow: "0px 10px 15px rgba(0, 0, 0, 100%)",
                  }
                : {}
            }
          />
          <img className={styles.iconContent} src={src} alt={alt} />
        </div>
      </div>
    </div>
  );
};

export default OrbitIcon;
