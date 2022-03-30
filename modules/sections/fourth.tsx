import React from "react";
import { useParallax } from "react-scroll-parallax";
import { useTheme } from "../../pages/_app";

import styles from "./fourth.module.css";
const baseOrbit =
  "rounded-[50%] outline outline-gray-200 dark:outline-slate-800 flex items-center justify-center";

const lerp = (x: any, y: any, a: any) => x * (1 - a) + y * a;

const Fourth: React.FC = () => {
  const { dark } = useTheme();
  const [offset, setOffset] = React.useState(50);

  const parallax = useParallax<HTMLDivElement>({
    onProgressChange: (p) => {
      setOffset(lerp(50, 20, Math.min(p * 2.75, 1)));
    },
    opacity: [0, 4],
  });

  return (
    <div className="w-full relative h-96">
      <div className={styles.divider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            style={{
              fill: dark ? "#000000" : "#ffffff",
            }}
          ></path>
        </svg>
      </div>
      <div className="w-full h-full bg-opacity-5 dark:bg-opacity-5 bg-gray-500 dark:bg-slate-100 flex flex-col items-center justify-center">
        <div className="mb-6 z-20">
          <div className="w-[270px] h-[270px] rounded-[50%] shadow-lg flex items-center justify-center dark:shadow-black mt-4">
            <div
              ref={parallax.ref}
              className={`${baseOrbit} w-48 h-48 outline-[4px]`}
              style={{ outlineOffset: offset }}
            >
              <div
                className={`${baseOrbit} w-32 h-32 outline-[6px]`}
                style={{ outlineOffset: offset }}
              >
                <div
                  className={`${baseOrbit} w-16 h-16 outline-[7px]`}
                  style={{ outlineOffset: offset }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-white dark:bg-black mb-12">
          <div className="text-center text-gray-700 dark:text-slate-200 bg-opacity-5 dark:bg-opacity-5 bg-gray-500 dark:bg-slate-100 p-2">
            View this site on{" "}
            <a
              className="hover:text-blue-400 font-bold umami--click--footer-site-github"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/miapolis/lerners.io"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fourth;
