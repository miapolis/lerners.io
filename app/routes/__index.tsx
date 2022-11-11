import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { LayoutWrapper } from "~/components/layout-wrapper";
import { getThemeSession } from "~/utils/theme.server";

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await getThemeSession(request);

  return {
    theme: getTheme(),
  };
};

export default function Index() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
