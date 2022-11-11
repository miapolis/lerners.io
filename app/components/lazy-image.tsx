import React from "react";
import { useTransition } from "@remix-run/react";

export interface LazyImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  alt: string;
  placeholderSrc: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholderSrc,
  ...props
}) => {
  const transition = useTransition();

  const [rendered, setRendered] = React.useState(false);
  React.useEffect(() => {
    const path = transition.location?.pathname || "";
    if (path.startsWith("/blog/") && !path.startsWith("/blog/tags/"))
      setRendered(false);
  }, [transition.state]);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => {
      setRendered(true);
    });
  }, [src]);

  return (
    <img
      {...{ ...props, src: rendered ? src : placeholderSrc }}
      alt={alt || ""}
    />
  );
};
