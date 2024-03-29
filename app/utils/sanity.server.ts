import { getSanityClient } from "~/config/sanity.server";
import { SanityPost } from "~/interfaces/post";
import { SanityTag } from "~/interfaces/tag";

export const getPosts = async (limit?: number): Promise<SanityPost[]> => {
  return await getSanityClient().fetch(
    `
      *[_type == 'post'][${limit != 0 ? "0...$limit" : ""}] {
          title,
          description,
          slug,
          publishedAt,
          "tags": tags[]->,
      } | order(dateTime(publishedAt) desc)
    `,
    limit != 0
      ? {
          limit: limit ?? 5,
        }
      : {}
  );
};

export const getTags = async (): Promise<SanityTag[]> => {
  return await getSanityClient().fetch(`*[_type == 'tag']`);
};

export const postsByTag = async (tag: string): Promise<SanityPost[]> => {
  return await getSanityClient().fetch(
    `
      *[_type == 'post' && $tag in tags[]->title] {
        title,
        description,
        slug,
        publishedAt,
        "tags": tags[]->,
        tags[]->{
          title,
          slug
        }
      }
    `,
    { tag }
  );
};
