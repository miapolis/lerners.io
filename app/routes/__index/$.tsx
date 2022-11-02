import { LoaderFunction, Response } from "@remix-run/node";
import { NotFoundPage } from "~/components/not-found-page";

export const loader: LoaderFunction = async () => {
  throw new Response("Not found", { status: 404 });
};

export const CatchBoundary = () => <NotFoundPage />;
export default function Splat() {
  return <></>;
}
