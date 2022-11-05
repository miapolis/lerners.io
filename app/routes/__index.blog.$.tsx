import React from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { LazyImage } from "~/components/lazy-image";
import { portableTextMap } from "~/components/portable-text-map";
import { sanityClient } from "~/config/sanity";
import { getSanityClient } from "~/config/sanity.server";
import { PostPreview, SanityPost } from "~/interfaces/post";
import { themeSessionResolver } from "~/utils/session.server";
import { dtFormatter } from "~/utils/time";
import { NotFoundPage } from "~/components/not-found-page";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { PostMenu } from "~/components/post-menu";
import { BlogLayoutWrapper } from "~/components/blog-layout-wrapper";

interface LoaderData {
  posts: SanityPost[];
  isPreview: boolean;
  nextPost: PostPreview | null;
  prevPost: PostPreview | null;
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

  const date = posts[0].publishedAt;
  const adjQuery = `
    {
      'prevPost': *[_type == "post" && publishedAt > $date] | order(publishedAt asc) [0] {
        slug,
        title
      },
      'nextPost': *[_type == "post" && publishedAt < $date] | order(publishedAt desc) [0] {
        slug,
        title
      }
    }
  `;

  const postData = await getSanityClient().fetch(adjQuery, { date });

  return json({
    posts,
    isPreview,
    nextPost: postData.nextPost,
    prevPost: postData.prevPost,
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
    <BlogLayoutWrapper aside={<PostMenu post={post} />}>
      <main className="mt-16 relative overflow-visible mb-32">
        <LazyImage
          className={`w-full rounded-xl mb-16 shadow-2xl`}
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
            <h1 className="text-5xl md:text-6xl font-extrabold">
              {post.title}
            </h1>
            <div className="mt-3 inline-flex gap-2 flex-wrap">
              {post.tags.map((tag, i) => (
                <Tag name={tag.title} key={i} />
              ))}
            </div>
          </div>
        </section>
        <PortableText value={post.body} components={portableTextMap} />
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          {loaderData.prevPost && (
            <NextPostComp post={loaderData.prevPost} next={false} />
          )}
          {loaderData.nextPost && (
            <NextPostComp post={loaderData.nextPost} next />
          )}
        </section>
      </main>
    </BlogLayoutWrapper>
  );
}

export const NextPostComp = ({
  post,
  next = false,
}: {
  post: PostPreview;
  next: boolean;
}) => {
  const Arrow = next ? IconArrowRight : IconArrowLeft;

  return (
    <Link
      to={`/blog/${post.slug.current}`}
      className={`transition-all duration-500 group w-full border-2 border-zinc-200 dark:border-zinc-800 hover:border-indigo-700 dark:hover:border-yellow-400 rounded-lg p-4 flex hover:shadow-md ${
        next ? "flex-row" : "flex-row-reverse"
      } items-center gap-4`}
    >
      <div
        className={`flex-1 ${
          next ? "items-start" : "items-end"
        } flex flex-col min-w-0`}
      >
        <div className="text-zinc-500 text-sm">
          {next ? "Next" : "Previous"} Post
        </div>
        <h4 className="text-xl font-semibold max-w-full whitespace-pre overflow-hidden overflow-ellipsis">
          {post.title}
        </h4>
      </div>
      <Arrow
        className="transition-all duration-500 stroke-zinc-300 dark:stroke-zinc-700 w-8 group-hover:stroke-indigo-700 dark:group-hover:stroke-yellow-400"
        size={32}
      />
    </Link>
  );
};

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
