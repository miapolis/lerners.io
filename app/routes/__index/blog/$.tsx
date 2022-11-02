import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { LazyImage } from "~/components/lazy-image";
import { portableTextMap } from "~/components/portable-text-map";
import { sanityClient } from "~/config/sanity";
import { getSanityClient } from "~/config/sanity.server";
import { SanityPost } from "~/interfaces/post";
import { themeSessionResolver } from "~/utils/session.server";
import { dtFormatter } from "~/utils/time";
import { NotFoundPage } from "~/components/not-found-page";

interface LoaderData {
  posts: SanityPost[];
  isPreview: boolean;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { getTheme } = await themeSessionResolver(request);
  const slug = params["*"];
  if (!slug) {
    throw new Response("Not found", { status: 404 });
  }

  const reqUrl = new URL(request?.url);
  const isPreview =
    reqUrl?.searchParams?.get("preview") === process.env.SANITY_PREVIEW_SECRET;

  const query = `*[_type == "post" && slug.current == $slug] {
    ...,
    "tags": tags[]->,
    "fullImage": primaryImage.asset->
  }`;

  const posts = await getSanityClient(isPreview).fetch(query, { slug });
  if (!posts.length) {
    throw new Response("Not found", { status: 404 });
  }

  return json({
    posts,
    isPreview,
    theme: getTheme(),
  });
};

const getSinglePost = (posts: SanityPost[], isPreview = false) => {
  if (!Array.isArray(posts)) {
    return posts;
  }
  if (posts.length === 1) {
    return posts[0];
  }
  if (isPreview) {
    return posts.find((x) => x._id.startsWith(`drafts.`)) || posts[0];
  }
  return posts[0];
};

export default function Post() {
  const loaderData = useLoaderData<LoaderData>();
  if (!loaderData) return null;

  const builder = imageUrlBuilder(sanityClient);
  const post = getSinglePost(loaderData.posts, loaderData.isPreview);

  return (
    <main className="mt-16 relative overflow-visible mb-32">
      <LazyImage
        className={`w-full rounded-xl mb-16 shadow-2xl shadow-zinc-900`}
        width={post.fullImage.metadata.dimensions.width}
        height={post.fullImage.metadata.dimensions.height}
        placeholderSrc={post.fullImage.metadata.lqip}
        src={builder.image(post.primaryImage).auto("format").url()}
        alt={post.primaryImage.caption}
      />
      <section className="mb-6 flex h-full -ml-[30px]">
        <div className="w-2 mr-6 bg-indigo-500" />
        <div className="h-full">
          <div className="text-zinc-700 dark:text-zinc-300 mb-2">
            Published {dtFormatter.format(new Date(post.publishedAt))}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold">{post.title}</h1>
          <div className="mt-3 inline-flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Tag name={tag.title} />
            ))}
          </div>
        </div>
      </section>
      <PortableText value={post.body} components={portableTextMap} />
    </main>
  );
}

export const Tag = ({ name }: { name: string }) => {
  return (
    <Link
      to={`/blog/tags/${name}`}
      className="transition-all inline-flex rounded-md bg-opacity-30 leading-none text-blue-500 font-semibold hover:text-blue-400 whitespace-nowrap"
    >
      {name}
    </Link>
  );
};

export const CatchBoundary = () => (
  <NotFoundPage message="We couldn't find that post." />
);
