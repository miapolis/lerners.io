import React, { ImgHTMLAttributes } from "react";

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
  const [renderedSrc, setRenderedSrc] = React.useState(placeholderSrc || src);

  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", () => {
      setRenderedSrc(src);
    });
  }, [src]);

  return <img {...{ ...props, src: renderedSrc }} alt={alt || ""} />;
};
