import React from "react";
import { Link } from "@remix-run/react";
import { SanityPost } from "~/interfaces/post";
import { dtFormatter } from "~/utils/time";
import { IconArrowRight } from "@tabler/icons";
import { LoadingBarContext } from "~/root";
import { NavLink } from "./nav-link";

export interface BlogDirectoryProps {
  title: string;
  subheading?: string;
  posts: SanityPost[];
}

export const BlogDirectory: React.FC<BlogDirectoryProps> = ({
  title,
  subheading,
  posts,
}) => {
  return (
    <div className="mt-16 mb-20">
      <h1 className="text-5xl font-extrabold">{title}</h1>
      <div className="text-indigo-700 dark:text-yellow-400 font-semibold">
        {subheading || <>&nbsp;</>}
      </div>
      <div className="mt-10">
        {posts.map((post, i) => (
          <PostCard key={i} {...post} />
        ))}
        {!posts.length && (
          <div className="text-lg text-zinc-500">No posts found</div>
        )}
      </div>
      <NavLink to="/blog/tags" text="View all tags" />
    </div>
  );
};

export const PostCard = (post: SanityPost) => {
  const bar = React.useContext(LoadingBarContext);

  return (
    <Link
      className={`umami--click--blog-post-${post.slug.current} group flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6`}
      to={`/blog/${post.slug.current}`}
      onClick={() => {
        bar?.current?.continuousStart();
      }}
    >
      <div className="transition-[border-right-color] w-32 sm:border-r-2 sm:border-r-black sm:dark:border-r-white group-focus:border-r-indigo-700 dark:group-focus:border-r-yellow-400 text-zinc-800 dark:text-zinc-200">
        <div>{dtFormatter.format(new Date(post.publishedAt))}</div>
      </div>
      <div className="flex-1">
        <h2 className="transition-all duration-500 text-black dark:text-white text-3xl font-semibold m-0 mb-1 group-hover:text-indigo-700 dark:group-hover:text-yellow-400">
          {post.title}
        </h2>
        <div className="inline-flex flex-wrap gap-2 mb-5 w-full">
          {post.tags.map((x, i) => (
            <Tag name={x.title} key={i} />
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
