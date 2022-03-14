import React from "react";
import { useParallax } from "react-scroll-parallax";
import ShapeOne from "./shapes/one";
import ShapeTwo from "./shapes/two";
import ShapeThree from "./shapes/three";

const SIZES = [130, 100, 60, 60, 60, 40, 40, 40, 30, 30];
const SPACE_CONSTANT = 150;
const OPACITY_VALUES = ["7", "8", "9", "a", "b", "c", "d", "e"];

const Dots: React.FC = () => {
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

      let parallax = useParallax<HTMLDivElement>({
        rotate: [0, rotation * direction],
        speed: speed * speedDir,
      });

      dots.push(
        <div ref={parallax.ref} className="absolute" style={{ left, top }}>
          {shape == 1 ? (
            <ShapeOne size={size} opacity={opacity} />
          ) : shape == 2 ? (
            <ShapeTwo size={size} opacity={opacity} />
          ) : (
            <ShapeThree size={size} opacity={opacity} />
          )}
        </div>
      );
    }
    return dots;
  };

  return <div className="w-full h-full">{generateDots()}</div>;
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
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <h1 className="text-white text-8xl font-bold z-10 drop-shadow-lg">
        Ethan Lerner
      </h1>
      <div className="absolute w-[1000px] h-[500px]">
        <Dots />
      </div>
    </div>
  );
};

export default First;
