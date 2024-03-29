import React from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export const LayoutWrapper: React.FC<
  React.PropsWithChildren & { footer?: boolean }
> = ({ children, footer = false }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full">
      <div className="max-w-7xl px-4 mx-auto sm:px-6 xl:px-20 min-h-full w-full flex-1">
        <Navbar />
        <main>{children}</main>
      </div>
      {footer && <Footer />}
    </div>
  );
};
