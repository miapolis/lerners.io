import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BlogDirectory } from "~/components/blog-directory";
import { SanityPost } from "~/interfaces/post";
import { getPosts } from "~/utils/sanity.server";

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

  return <BlogDirectory title="Latest Posts" posts={data.posts} />;
}
