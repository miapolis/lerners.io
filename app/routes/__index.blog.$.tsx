import React from "react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useTransition } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { LazyImage } from "~/components/lazy-image";
import { portableTextMap } from "~/components/portable-text-map";
import { sanityClient } from "~/config/sanity";
import { getSanityClient } from "~/config/sanity.server";
import { getThemeSession } from "~/utils/theme.server";
import { PostPreview, SanityPost } from "~/interfaces/post";
import { dtFormatter } from "~/utils/time";
import { NotFoundPage } from "~/components/not-found-page";
import { IconArrowLeft, IconArrowRight, IconEye } from "@tabler/icons";
import { PostMenu } from "~/components/post-menu";
import { BlogLayoutWrapper } from "~/components/blog-layout-wrapper";
import { cache } from "~/services/redis.server";
import { LoadingBarContext } from "~/root";
import { commitSession, getSession } from "~/utils/session.server";
import { db } from "~/services/db.server";
import { baseUrl } from "~/utils/site-url";

interface LoaderData {
  posts: SanityPost[];
  isPreview: boolean;
  nextPost: PostPreview | null;
  prevPost: PostPreview | null;
  url: string;
  hits: number;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { getTheme } = await getThemeSession(request);
  const slug = params["*"];
  if (!slug) {
    throw new Response("Not found", { status: 404 });
  }

  const reqUrl = new URL(request?.url);
  const isPreview =
    reqUrl?.searchParams?.get("preview") === process.env.SANITY_PREVIEW_SECRET;

  let posts, adjData, hits;
  const key = `post:${slug}`;

  if ((await cache.redis.exists(key)) && !isPreview) {
    const data = JSON.parse((await cache.redis.get(key))!);
    posts = data.posts;
    adjData = data.adjData;
    hits = data.hits;
  } else {
    const query = `*[_type == "post" && slug.current == $slug] {
      ...,
      "tags": tags[]->,
      "fullImage": primaryImage.asset->
    }`;

    posts = await getSanityClient(isPreview).fetch(query, { slug });
    if (!posts.length) {
      throw new Response("Not found", { status: 404 });
    }

    const date = posts[0].publishedAt;
    const adjQuery = `{
      'prevPost': *[_type == "post" && publishedAt > $date] | order(publishedAt asc) [0] {
        slug,
        title
      },
      'nextPost': *[_type == "post" && publishedAt < $date] | order(publishedAt desc) [0] {
        slug,
        title
      }
    }`;

    adjData = await getSanityClient().fetch(adjQuery, { date });

    const {
      _sum: { count },
    } = await db.slottedPostCounter.aggregate({
      where: {
        slug,
      },
      _sum: {
        count: true,
      },
    });
    hits = count || 0;

    cache.redis.set(
      `post:${slug}`,
      JSON.stringify({ posts, adjData, hits }),
      "EX",
      300
    );
  }

  const headers: Record<string, string> = {};
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has(`hit:${slug}`)) {
    const slot = Math.floor(Math.random() * 100);
    await db.slottedPostCounter.upsert({
      where: {
        slug_slot: {
          slug,
          slot,
        },
      },
      create: {
        slug,
        slot,
        count: 1,
      },
      update: {
        count: { increment: 1 },
      },
    });

    session.set(`hit:${slug}`, 1);
    headers["Set-Cookie"] = await commitSession(session);
  }

  const url = `${baseUrl(request)}/blog/${posts[0].slug.current}`;
  return json(
    {
      posts,
      isPreview,
      nextPost: adjData.nextPost,
      prevPost: adjData.prevPost,
      url,
      hits,
      theme: getTheme(),
    },
    { headers }
  );
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

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const builder = imageUrlBuilder(sanityClient);

  return {
    title: data.posts[0].title,
    description: data.posts[0].description,
    keywords: data.posts[0].tags.map((x) => x.title).join(","),
    "theme-color": "#6366f1",

    "og:site_name": "Ethan Lerner",
    "og:url": data.url,
    "og:title": data.posts[0].title,
    "og:description": data.posts[0].description,
    "og:image": builder.image(data.posts[0].fullImage).auto("format").url(),

    "og:type": "article",
    "article:published_time": new Date(data.posts[0].publishedAt).toISOString(),

    "twitter:card": "summary_large_image",
    "twitter:url": data.url,
    "twitter:title": data.posts[0].title,
    "twitter:description": data.posts[0].description,
    "twitter:image": builder
      .image(data.posts[0].fullImage)
      .auto("format")
      .url(),
  };
};

export default function Post() {
  const transition = useTransition();
  const loaderData = useLoaderData<LoaderData>();
  if (!loaderData) return null;

  const builder = imageUrlBuilder(sanityClient);
  const post = getSinglePost(loaderData.posts, loaderData.isPreview);

  const bar = React.useContext(LoadingBarContext);
  React.useEffect(() => {
    if (transition.state == "idle") bar?.current?.complete();
  }, [transition.state]);

  return (
    <BlogLayoutWrapper aside={<PostMenu post={post} />}>
      <div className="mt-16 relative overflow-visible mb-32">
        <LazyImage
          className={`w-full rounded-lg mb-16 shadow-2xl`}
          width={post.fullImage.metadata.dimensions.width}
          height={post.fullImage.metadata.dimensions.height}
          placeholderSrc={post.fullImage.metadata.lqip}
          src={builder.image(post.primaryImage).auto("format").url()}
          alt={post.primaryImage.caption}
        />
        <div className="flex justify-end gap-2 text-zinc-500 items-center"></div>
        <section className="mb-6 flex h-full -ml-[30px]">
          <div className="w-2 mr-6 bg-indigo-500" />
          <div className="h-full w-full">
            <div className="w-full flex justify-between items-center mb-2">
              <div className="text-zinc-700 dark:text-zinc-300">
                Published {dtFormatter.format(new Date(post.publishedAt))}
              </div>
              <div className="flex gap-2 items-center text-zinc-500 text-sm">
                <IconEye size={18} />
                {loaderData.hits.toLocaleString()}
              </div>
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
        <article>
          <PortableText value={post.body} components={portableTextMap} />
        </article>
        <section
          className={`w-full grid grid-cols-1 ${
            loaderData.prevPost && loaderData.nextPost ? "sm:grid-cols-2" : ""
          } gap-4 mt-12`}
        >
          {loaderData.prevPost && (
            <NextPostComp post={loaderData.prevPost} next={false} />
          )}
          {loaderData.nextPost && (
            <NextPostComp post={loaderData.nextPost} next />
          )}
        </section>
      </div>
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
  const bar = React.useContext(LoadingBarContext);
  const Arrow = next ? IconArrowRight : IconArrowLeft;

  return (
    <Link
      to={`/blog/${post.slug.current}`}
      className={`umami--click--post-${
        next ? "next" : "previous"
      } transition-all duration-500 group w-full border-2 border-zinc-200 dark:border-zinc-800 hover:border-indigo-700 dark:hover:border-yellow-400 rounded-lg p-4 flex hover:shadow-md ${
        next ? "flex-row" : "flex-row-reverse"
      } items-center gap-4`}
      onClick={() => {
        bar?.current!.continuousStart();
      }}
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
