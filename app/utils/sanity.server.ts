import { getSanityClient } from "~/config/sanity.server";
import { SanityPost } from "~/interfaces/post";

export const getPosts = async (limit?: number): Promise<SanityPost[]> => {
  return await getSanityClient().fetch(
    `
      *[_type == 'post'][0...$limit] {
          ...,
          "tags": tags[]->,
      } | order(dateTime(publishedAt) desc)
    `,
    {
      limit: limit ?? 5,
    }
  );
};

export const postsByTag = async (tag: string): Promise<SanityPost[]> => {
  return await getSanityClient().fetch(
    `
      *[_type == 'post' && $tag in tags[]->title] {
        ...,
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
