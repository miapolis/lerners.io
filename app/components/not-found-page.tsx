import React from "react";

export interface NotFoundPageProps {
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  message = "Looks like there's nothing here...",
}) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none flex items-center justify-center">
      <div className="absolute pointer-events-auto flex flex-col items-center">
        <div className="flex gap-2 text-7xl sm:text-9xl font-extrabold">
          <h1>4</h1>
          <h1 className="text-zinc-500">0</h1>
          <h1>4</h1>
        </div>
        <div className="text-lg sm:text-xl mt-8 text-zinc-500">{message}</div>
      </div>
    </div>
  );
};
