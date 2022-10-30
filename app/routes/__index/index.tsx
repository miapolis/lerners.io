import React, { lazy, Suspense } from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTheme, Theme } from "remix-themes";
import { ClientOnly } from "remix-utils";
import { SanityPost } from "~/interfaces/post";
import { getPosts } from "~/utils/sanity.server";

import { IconArrowRight } from "@tabler/icons";
import PuffLoader from "react-spinners/PuffLoader";
import { dtFormatter } from "~/utils/time";

type LoaderData = {
  posts: SanityPost[];
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

// @ts-ignore
let Spline = lazy(() => import("@splinetool/react-spline"));

export default function Index() {
  const data = useLoaderData<LoaderData>();

  const [theme] = useTheme();
  const [landed, setLanded] = React.useState(false);

  React.useEffect(() => {
    setLanded(true);
  }, []);

  return (
    <div>
      <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none flex items-center justify-center">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <PuffLoader
            loading={landed}
            color={theme == Theme.DARK ? "white" : "black"}
            size={300}
          />
        </div>
        <ClientOnly>
          {() => (
            <Suspense fallback="">
              <Spline
                scene="https://prod.spline.design/taXw95jMHuEO12Wp/scene.splinecode"
                className="absolute"
              />
            </Suspense>
          )}
        </ClientOnly>
      </div>
      <div className="h-[calc(100vh-128px)] flex items-center justify-center">
        <h1 className="text-7xl sm:text-9xl font-bold z-[100] drop-shadow-xl text-center px-8">
          Ethan Lerner
        </h1>
      </div>
      <div className="mt-16">
        <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-2xl rounded-xl border-2 border-black dark:border-white mb-8 shadow-2xl">
          {data.posts.map((post, i) => (
            <PostCard key={i} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const PostCard = (post: SanityPost) => {
  return (
    <Link
      className="flex gap-3 flex-col md:flex-row py-6 px-7 group"
      to={`/blog/${post.slug.current}`}
    >
      <div className="mt-2 whitespace-nowrap">
        <div className="text-sm text-gray-800 dark:text-gray-200 inline-flex w-18">
          {dtFormatter.format(new Date(post.publishedAt))}
        </div>
        <div className="text-gray-500 text-sm font-extrabold ml-3 hidden md:inline-flex">
          •
        </div>
      </div>
      <div>
        <h4 className="transition-[color,transform] duration-500 group-hover:text-indigo-800 dark:group-hover:text-amber-400 group-hover:translate-x-1 text-4xl font-bold mb-3">
          {post.title}
        </h4>
        <div className="inline-flex flex-wrap gap-2 mb-5 w-full">
          {post.tags.map((t, i) => (
            <Tag key={i} name={t.title} />
          ))}
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          {post.description}
        </div>
        <div className="flex gap-2 items-center mt-3">
          <div className="font-semibold text-lg">Read more</div>
          <IconArrowRight className="transition-all duration-500 stroke-indigo-800 dark:stroke-amber-400 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
        </div>
      </div>
    </Link>
  );
};

export const Tag = ({ name }: { name: string }) => {
  return (
    <div className="inline-flex px-2 py-1 rounded-md bg-zinc-500 bg-opacity-30 text-sm shadow-sm leading-none">
      {name}
    </div>
  );
};
