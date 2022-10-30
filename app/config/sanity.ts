import PicoSanity from "picosanity";

export const sanityConfig = {
    apiVersion: "2022-10-28",
    dataset: "production",
    useCdn: false,
    projectId: "u896dyie"
}
export const sanityClient = new PicoSanity(sanityConfig);