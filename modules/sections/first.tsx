import React from "react";
import { Parallax } from "react-scroll-parallax";
import Scroll from "react-scroll";
import ShapeOne from "./shapes/one";
import ShapeTwo from "./shapes/two";
import ShapeThree from "./shapes/three";
import styles from "./first.module.css";
import { Arrow } from "../../components/icons/arrow";
import { animated, useSpringRef, useTransition } from "react-spring";
import { useTheme } from "../../pages/_app";

const scroll = Scroll.animateScroll;

const SIZES = [130, 100, 60, 60, 60, 40, 40, 40, 30, 30];
const SPACE_CONSTANT = 150;
const OPACITY_VALUES = ["7", "8", "9", "a", "b", "c", "d", "e"];

const shapeColor = { dark: "ffffff", light: "000000" };

interface DotsProps {
  titleRef: React.RefObject<HTMLDivElement>;
}

const Dots: React.FC<DotsProps> = ({ titleRef }) => {
  const WIN_WIDTH = Math.min(window.innerWidth, 1000);
  const WIN_HEIGHT = Math.min(window.innerHeight, 500);

  const TITLE_WIDTH = titleRef.current!.clientWidth + 100;
  const TITLE_HEIGHT = titleRef.current!.clientHeight + 100;

  const MIN_TITLE_LEFT = (WIN_WIDTH - TITLE_WIDTH) / 2;
  const MAX_TITLE_LEFT = MIN_TITLE_LEFT + TITLE_WIDTH;
  const MIN_TITLE_TOP = (WIN_HEIGHT - TITLE_HEIGHT) / 2;
  const MAX_TITLE_TOP = MIN_TITLE_TOP + TITLE_HEIGHT;

  const { theme } = useTheme();
  const [scrollEnd, setScrollEnd] = React.useState(window.innerHeight);
  const [refreshTimeout, setRefreshTimeout] = React.useState<any>();

  React.useEffect(() => {
    const onResize = () => {
      setScrollEnd(window.innerHeight);

      clearTimeout(refreshTimeout);
      setRefreshTimeout(
        setTimeout(() => {
          setElements(generateDots());
          api.start();
        }, 300)
      );
    };

    window.addEventListener("resize", onResize);
  }, []);

  const generateDots = () => {
    const dots = [];
    const bounds = [];

    for (let i = 0; i < 10; i++) {
      let left = Math.random() * WIN_WIDTH;
      let top = Math.random() * WIN_HEIGHT;
      let size = SIZES[i];
      const opacity =
        OPACITY_VALUES[Math.floor(Math.random() * OPACITY_VALUES.length)];
      const direction = Math.random() < 0.5 ? 1 : -1;
      const initialRotation = Math.floor(Math.random() * 360);
      const rotation = Math.floor(Math.random() * 600) + 360;
      const speed = Math.floor(Math.random() * 20) + 1;
      const speedDir = Math.random() < 0.5 ? 1 : -1;
      const shape = Math.floor(Math.random() * 3) + 1;

      while (inNameArea(left, top, size) || intersectsAny(bounds, left, top)) {
        left = Math.random() * 1000;
        top = Math.random() * 500;
      }

      bounds.push({ left, top });

      dots.push([
        { left, top },
        <Parallax
          startScroll={0}
          endScroll={scrollEnd}
          translateY={["0px", `${speed * speedDir * 12}px`]}
          key={i}
          rotate={[initialRotation, rotation * direction]}
        >
          {shape == 1 ? (
            <ShapeOne
              size={size}
              color={shapeColor[theme as keyof typeof shapeColor]}
              opacity={opacity}
            />
          ) : shape == 2 ? (
            <ShapeTwo
              size={size}
              color={shapeColor[theme as keyof typeof shapeColor]}
              opacity={opacity}
            />
          ) : (
            <ShapeThree
              size={size}
              color={shapeColor[theme as keyof typeof shapeColor]}
              opacity={opacity}
            />
          )}
        </Parallax>,
      ]);
    }
    return dots;
  };

  let [elements, setElements] = React.useState<any>([]);
  const api = useSpringRef();
  const transition = useTransition(elements ?? [], {
    ref: api,
    trail: 400 / elements.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
  });

  React.useEffect(() => {
    setElements(generateDots());
    setTimeout(() => {
      api.start();
    }, 10);
  }, [theme]);

  const intersectsAny = (bounds: any[], left: number, top: number): boolean => {
    return bounds.some(
      (b) =>
        Math.abs(b.left - left) < SPACE_CONSTANT &&
        Math.abs(b.top - top) < SPACE_CONSTANT
    );
  };

  const inNameArea = (left: number, top: number, size: number): boolean => {
    const minTop = top;
    const maxTop = top + size;
    const minLeft = left;
    const maxLeft = left + size;

    const leftOf = maxLeft < MIN_TITLE_LEFT;
    const rightOf = minLeft > MAX_TITLE_LEFT;
    const above = maxTop < MIN_TITLE_TOP;
    const below = minTop > MAX_TITLE_TOP;

    return !(leftOf || rightOf || above || below);
  };

  return (
    <div className="w-full h-full">
      {transition((style, [props, item]) => (
        <animated.div
          style={{
            ...style,
            left: props.left,
            top: props.top,
            translateY: 0,
            translateX: 0,
          }}
          className="absolute"
        >
          {item}
        </animated.div>
      ))}
    </div>
  );
};

const First: React.FC = () => {
  const { dark } = useTheme();
  const [arrowOpacity, setArrowOpacity] = React.useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="w-full overflow-hidden relative pb-[117px]">
      <div
        ref={containerRef}
        className="h-[60vh] sm:h-screen flex items-center justify-center relative overflow-visible"
      >
        <h1
          ref={titleRef}
          className="text-black dark:text-white text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-bold z-10 drop-shadow-lg"
        >
          Ethan Lerner
        </h1>
        <div className="absolute w-screen max-w-[1000px] h-screen max-h-[500px]">
          {titleRef.current ? <Dots titleRef={titleRef} /> : ""}
        </div>
        <Parallax
          startScroll={0}
          endScroll={containerRef.current?.clientHeight || 0}
          className={`absolute w-[40px] h-[40px] bottom-0 sm:bottom-20 ${
            arrowOpacity > 0.3 ? "cursor-pointer" : ""
          }`}
          easing="easeOut"
          onProgressChange={(progress) => {
            setArrowOpacity(1 - progress);
          }}
          onClick={() => {
            if (arrowOpacity > 0.3) {
              scroll.scrollTo(containerRef.current!.clientHeight + 10, {
                duration: 1700,
              });
            }
          }}
        >
          <Arrow
            size={40}
            color={`rgb(${
              dark ? "230, 230, 230" : "25, 25, 25"
            }, ${arrowOpacity})`}
          />
        </Parallax>
      </div>
      <div className={styles.divider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-gray-100 dark:fill-slate-900"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default First;
