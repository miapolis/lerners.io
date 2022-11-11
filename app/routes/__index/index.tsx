import React, { Suspense } from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { cache } from "~/services/redis.server";
import { SanityPost } from "~/interfaces/post";
import { getPosts } from "~/utils/sanity.server";
import { LoadingBarContext } from "~/root";

import { IconArrowRight } from "@tabler/icons";
import { dtFormatter } from "~/utils/time";
import { Theme } from "~/components/theme-provider";
import { useTheme } from "~/hooks/use-theme";

// @ts-ignore
const Spline = React.lazy(() => import("@splinetool/react-spline"));

type LoaderData = {
  posts: SanityPost[];
};

export const loader: LoaderFunction = async () => {
  const defaultKey = `landing:posts`;
  let posts;
  if (await cache.redis.exists(defaultKey)) {
    const data = JSON.parse((await cache.redis.get(defaultKey))!);
    posts = data.posts;
  } else {
    posts = await getPosts();
    await cache.redis.set(defaultKey, JSON.stringify({ posts }), "EX", 300);
  }

  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  const [theme] = useTheme();

  return (
    <div>
      <div className="fixed w-screen h-screen top-0 left-0 pointer-events-none flex items-center justify-center z-[50]">
        <Suspense fallback={<></>}>
          <Spline
            scene="https://prod.spline.design/taXw95jMHuEO12Wp/scene.splinecode"
            className="absolute"
          />
        </Suspense>
      </div>
      <div className="h-[calc(100vh-128px)] flex items-center justify-center relative">
        <div className="w-full h-full absolute top-0 left-0 halftoneBackground opacity-20 bg-zinc-50 dark:bg-zinc-900">
          <div
            className={`w-full h-full ${
              theme == Theme.DARK ? "halftone" : "halftoneLight"
            }`}
          />
        </div>
        <h1 className="text-7xl sm:text-9xl font-bold z-[100] drop-shadow-xl text-center px-8">
          Ethan Lerner
        </h1>
      </div>
      <div className="mt-16 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full">
          {data.posts.map((post, i) => (
            <PostCard key={i} {...post} />
          ))}
        </div>
        <Link
          to="/blog"
          className="relative group flex gap-2 justify-end items-center mt-8 text-xl z-[100]"
        >
          <div className="transition-all duration-500 group-hover:text-indigo-700 dark:group-hover:text-yellow-400">
            All Posts
          </div>
          <IconArrowRight className="transition-all duration-500 group-hover:translate-x-3 group-hover:stroke-indigo-700 dark:group-hover:stroke-yellow-400" />
        </Link>
      </div>
    </div>
  );
}

export const PostCard = (post: SanityPost) => {
  const bar = React.useContext(LoadingBarContext);

  return (
    <Link
      className="z-[100] flex gap-3 flex-col py-6 px-7 group bg-zinc-400 dark:bg-zinc-600 bg-opacity-10 dark:bg-opacity-10 backdrop-blur-xl rounded-xl border-2 border-black dark:border-white border-opacity-30 dark:border-opacity-30 shadow-xl"
      to={`/blog/${post.slug.current}`}
      onClick={() => {
        bar?.current!.continuousStart();
      }}
    >
      <div className="mt-2 text-sm text-gray-800 dark:text-gray-200 inline-flex w-18">
        {dtFormatter.format(new Date(post.publishedAt))}
      </div>
      <div>
        <h4 className="transition-[color,transform] duration-500 group-hover:text-indigo-800 dark:group-hover:text-yellow-400 group-hover:translate-x-1 text-4xl font-bold mb-3">
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
          <IconArrowRight className="transition-all duration-500 stroke-indigo-800 dark:stroke-yellow-400 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
        </div>
      </div>
    </Link>
  );
};

export const Tag = ({ name }: { name: string }) => {
  return (
    <div className="inline-flex px-2 py-1 rounded-md bg-zinc-400 dark:bg-zinc-600 bg-opacity-30 dark:bg-opacity-30 text-sm leading-none">
      {name}
    </div>
  );
};
