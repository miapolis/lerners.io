import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import {
  useTheme,
  ThemeProvider,
  PreventFlashOnWrongTheme,
} from "remix-themes";
import { themeSessionResolver } from "./utils/session.server";

import styles from "./tailwind.css";
import font from "./styles/font.css";
import { LayoutWrapper } from "./components/layout-wrapper";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Ethan Lerner",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: font },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
};

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export const App = () => {
  const data = useLoaderData();
  const [theme] = useTheme();

  return (
    <html lang="en" className={theme ?? ""} data-theme={theme ?? ""}>
      <head>
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white w-full min-h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
