import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { LayoutWrapper } from "~/components/layout-wrapper";
import { baseUrl } from "~/utils/site-url";
import { getThemeSession } from "~/utils/theme.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await getThemeSession(request);

  return {
    theme: getTheme(),
    url: baseUrl(request),
  };
};

export const meta: MetaFunction = ({ data }) => {
  const desc =
    "Hi, I'm Ethan. I'm a student and full-stack software developer interested in frontend design, distributed systems, and game engines.";

  return {
    title: "Ethan Lerner",
    description: desc,
    "og:title": "Ethan Lerner",
    "og:type": "website",
    "og:description": desc,
    "og:image": `${data.url}/og-default.png`,

    "twitter:card": "summary_large_image",
    "twitter:url": data.url,
    "twitter:title": "Ethan Lerner",
    "twitter:description": desc,
    "twitter:image": `${data.url}/og-default.png`,
  };
};

export default function Index() {
  return (
    <LayoutWrapper footer>
      <Outlet />
    </LayoutWrapper>
  );
}
