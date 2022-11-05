import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
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
