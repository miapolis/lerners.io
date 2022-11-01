import { LoaderFunction } from "@remix-run/node";
import { Outlet, useCatch } from "@remix-run/react";
import { useTheme } from "remix-themes";
import { LayoutWrapper } from "~/components/layout-wrapper";
import { themeSessionResolver } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);

  return {
    theme: getTheme()
  }
}

export default function Index() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
