import React from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export const BlogLayoutWrapper: React.FC<
  React.PropsWithChildren & { aside: React.ReactNode }
> = ({ children, aside }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full items-center">
      <div className="max-w-7xl px-4 sm:px-6 xl:px-20 min-h-full w-full">
        <Navbar />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr,256px] 2xl:grid-cols-[256px,1fr,256px]">
        <div className="hidden 2xl:block" />
        <div className="max-w-7xl px-4 sm:px-6 xl:px-20 min-h-full min-w-0 w-full flex-[100]">
          <main>{children}</main>
        </div>
        <div className="hidden xl:block w-full h-full">{aside}</div>
      </div>
      <Footer />
    </div>
  );
};
