import React from "react";
import { Parallax } from "react-scroll-parallax";
import Scroll from "react-scroll";
import ShapeOne from "./shapes/one";
import ShapeTwo from "./shapes/two";
import ShapeThree from "./shapes/three";
import styles from "./first.module.css";
import { Arrow } from "../../components/icons/arrow";
import { animated, useSpringRef, useTransition } from "react-spring";
import { ThemeContext } from "../../pages/_app";

const scroll = Scroll.animateScroll;

const SIZES = [130, 100, 60, 60, 60, 40, 40, 40, 30, 30];
const SPACE_CONSTANT = 150;
const OPACITY_VALUES = ["7", "8", "9", "a", "b", "c", "d", "e"];

const shapeColor = { dark: "ffffff", light: "000000" };

const Dots: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  const generateDots = () => {
    const dots = [];
    const bounds = [];

    for (let i = 0; i < 10; i++) {
      let left = Math.random() * 1000;
      let top = Math.random() * 500;
      let size = SIZES[i];
      const opacity =
        OPACITY_VALUES[Math.floor(Math.random() * OPACITY_VALUES.length)];
      const direction = Math.random() < 0.5 ? 1 : -1;
      const rotation = Math.floor(Math.random() * 1200) + 360;
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
          key={i}
          rotate={[0, rotation * direction]}
          speed={speed * speedDir}
        >
          {shape == 1 ? (
            <ShapeOne
              size={size}
              color={shapeColor[theme.value as keyof typeof shapeColor]}
              opacity={opacity}
            />
          ) : shape == 2 ? (
            <ShapeTwo
              size={size}
              color={shapeColor[theme.value as keyof typeof shapeColor]}
              opacity={opacity}
            />
          ) : (
            <ShapeThree
              size={size}
              color={shapeColor[theme.value as keyof typeof shapeColor]}
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
  }, [theme.value]);

  return (
    <div className="w-full h-full">
      {transition((style, [props, item]) => (
        <animated.div
          style={{ ...style, left: props.left, top: props.top }}
          className="absolute"
        >
          {item}
        </animated.div>
      ))}
    </div>
  );
};

const intersectsAny = (bounds: any[], left: number, top: number): boolean => {
  return bounds.some(
    (b) =>
      Math.abs(b.left - left) < SPACE_CONSTANT &&
      Math.abs(b.top - top) < SPACE_CONSTANT
  );
};

const inNameArea = (left: number, top: number, size: number): boolean => {
  const nameMinLeft = 217;
  const nameMaxLeft = 783;
  const nameMinTop = 202;
  const nameMaxTop = 298;

  const minTop = top;
  const maxTop = top + size;
  const minLeft = left;
  const maxLeft = left + size;

  const leftOf = maxLeft < nameMinLeft;
  const rightOf = minLeft > nameMaxLeft;
  const above = maxTop < nameMinTop;
  const below = minTop > nameMaxTop;

  return !(leftOf || rightOf || above || below);
};

const First: React.FC = () => {
  const theme = React.useContext(ThemeContext);
  const [arrowOpacity, setArrowOpacity] = React.useState(1);

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{ height: "calc(100vh + 117px)" }}
    >
      <div className="h-screen flex items-center justify-center relative overflow-visible">
        <h1
          className={`${
            theme.value == "dark" ? "text-white" : "text-black"
          } text-8xl font-bold z-10 drop-shadow-lg`}
        >
          Ethan Lerner
        </h1>
        <div className="absolute w-[1000px] h-[500px]">
          <Dots />
        </div>
        <Parallax
          className={`absolute w-[40px] h-[40px] bottom-20 ${
            arrowOpacity > 0.3 ? "cursor-pointer" : ""
          }`}
          easing="easeOut"
          onProgressChange={(progress) => {
            setArrowOpacity(1 - progress);
          }}
          onClick={() => {
            if (arrowOpacity > 0.3) {
              scroll.scrollTo(window.innerHeight + 117, { duration: 1700 });
            }
          }}
        >
          <Arrow
            size={40}
            color={`rgb(${
              theme.value == "dark" ? "230, 230, 230" : "25, 25, 25"
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
            className={
              theme.value == "dark" ? "fill-gray-900" : "fill-gray-100"
            }
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default First;
