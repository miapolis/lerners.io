import { Outlet, ScrollRestoration } from "@remix-run/react";
import { LayoutWrapper } from "~/components/layout-wrapper";

export default function Index() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}
