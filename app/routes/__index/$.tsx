import { LoaderFunction, Response } from "@remix-run/node";
import Spline from "@splinetool/react-spline";
import { Suspense } from "react";
import { ClientOnly } from "remix-utils";

export const loader: LoaderFunction = async () => {
  throw new Response("Not found", { status: 404 });
};

export function CatchBoundary(): JSX.Element {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none flex items-center justify-center">
      <div className="absolute flex text-7xl gap-12 sm:text-9xl sm:gap-24 font-extrabold">
        <h1>4</h1>
        <h1 className="text-zinc-500">0</h1>
        <h1>4</h1>
      </div>
      <ClientOnly>
        {() => (
          <Suspense>
            <div className="fixed w-[400vw] h-[400vh] scale-[25%] sm:w-[200vw] sm:h-[200vh] sm:scale-50">
              <Spline scene="https://prod.spline.design/taXw95jMHuEO12Wp/scene.splinecode" />
            </div>
          </Suspense>
        )}
      </ClientOnly>
    </div>
  );
}

export default function Splat() {
  return <></>;
}
