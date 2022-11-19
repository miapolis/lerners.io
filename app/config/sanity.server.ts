import PicoSanity from "picosanity";
import { sanityClient, sanityConfig } from "./sanity";

export const previewClient = new PicoSanity({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN ?? "",
});

export const getSanityClient = (usePreview = false) =>
  usePreview ? previewClient : sanityClient;
