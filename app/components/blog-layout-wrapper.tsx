import React from "react";
import { useMedia } from "~/hooks/use-media";
import { Navbar } from "./navbar";

export const BlogLayoutWrapper: React.FC<
  React.PropsWithChildren & { aside: React.ReactNode }
> = ({ children, aside }) => {
  const isXl = useMedia("(min-width: 1400px)");

  return (
    <div className="flex flex-col min-h-screen min-w-full items-center">
      <div className="max-w-7xl px-4 sm:px-6 xl:px-20 min-h-full w-full">
        <Navbar />
      </div>
      <div className="flex w-full justify-center">
        <div className="flex-1" />
        <div className="max-w-7xl px-4 sm:px-6 xl:px-20 min-h-full w-full flex-[100]">
          <main>{children}</main>
        </div>
        <div className="flex-1">{isXl && aside}</div>
      </div>
    </div>
  );
};
