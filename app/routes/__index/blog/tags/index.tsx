import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { NavLink } from "~/components/nav-link";
import { SanityTag } from "~/interfaces/tag";
import { getTags } from "~/utils/sanity.server";

type LoaderData = {
  tags: SanityTag[];
};

export const loader: LoaderFunction = async () => {
  const tags = await getTags();
  return json({
    tags,
  });
};

export default function Tags() {
  const { tags } = useLoaderData<LoaderData>();

  return (
    <div className="mt-16 mb-20">
      <h1 className="text-5xl font-extrabold">Tags ({tags.length})</h1>
      <div className="mt-6 -ml-2">
        {tags
          .map((x) => x.title)
          .sort()
          .map((tag) => (
            <Link
              to={`/blog/tags/${tag}`}
              className="transition-all inline-block m-2 font-semibold hover:text-indigo-700 dark:hover:text-yellow-400"
            >
              {tag}
            </Link>
          ))}
      </div>
      <NavLink to="/blog" text="View all posts" />
    </div>
  );
}
