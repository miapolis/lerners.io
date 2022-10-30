import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { TypedObject } from "@portabletext/types";
import { SanityTag } from "./tag";

export interface SanityPost {
  _id: string;
  title: string;
  fullImage: {
    metadata: {
      lqip: string;
      dimensions: {
        height: number;
        width: number;
      };
    };
  };
  primaryImage: SanityImageSource & { caption: string };
  tags: SanityTag[];
  body: TypedObject | TypedObject[];
  slug: {
    current: string;
  };
  publishedAt: string;
  description: string;
}
