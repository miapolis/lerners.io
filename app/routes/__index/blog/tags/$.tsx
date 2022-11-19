import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { BlogDirectory } from "~/components/blog-directory";
import { NotFoundPage } from "~/components/not-found-page";
import { SanityPost } from "~/interfaces/post";
import { postsByTag } from "~/utils/sanity.server";

type LoaderData = {
  posts: SanityPost[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const tag = params["*"];
  if (!tag) {
    throw new Response("Not found", { status: 404 });
  }

  return json<LoaderData>({
    posts: await postsByTag(tag),
  });
};

export const CatchBoundary = () => <NotFoundPage />;

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const params = useParams();
  const tag = params["*"];

  return (
    <BlogDirectory
      title="Latest Posts"
      posts={data.posts}
      subheading={`tagged: ${tag}`}
    />
  );
}
