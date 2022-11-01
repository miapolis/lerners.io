import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { IconArrowRight } from "@tabler/icons";
import { SanityPost } from "~/interfaces/post";
import { getPosts } from "~/utils/sanity.server";
import { dtFormatter } from "~/utils/time";

type LoaderData = {
  posts: SanityPost[];
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    posts: await getPosts(60),
  });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="mt-16">
      <h1 className="text-5xl font-extrabold">Latest Posts</h1>
      <div className="mt-10 mb-20">
        {data.posts.map((post) => (
          <PostCard {...post} />
        ))}
      </div>
    </div>
  );
}

const PostCard = (post: SanityPost) => {
  return (
    <Link
      className="group flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6"
      to={`/blog/${post.slug.current}`}
    >
      <div className="w-32 sm:border-r-2 sm:border-r-black sm:dark:border-r-white text-zinc-800 dark:text-zinc-200">
        <div>{dtFormatter.format(new Date(post.publishedAt))}</div>
      </div>
      <div className="flex-1">
        <h2 className="transition-all duration-500 text-black dark:text-white text-3xl font-semibold m-0 mb-1 group-hover:text-indigo-700 dark:group-hover:text-yellow-400">
          {post.title}
        </h2>
        <div className="inline-flex flex-wrap gap-2 mb-5 w-full">
          {post.tags.map((x) => (
            <Tag name={x.title} />
          ))}
        </div>
        <div className="text-md text-zinc-700 dark:text-zinc-300">
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

const Tag = ({ name }: { name: string }) => {
  return (
    <div className="inline-flex text-sm leading-none text-zinc-500 font-semibold">
      {name}
    </div>
  );
};
