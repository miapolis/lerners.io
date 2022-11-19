import React from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import styles from "./tailwind.css";
import font from "./styles/font.css";
import { getThemeSession } from "./utils/theme.server";
import {
  PreventFlashOnWrongTheme,
  Theme,
  ThemeProvider,
} from "./components/theme-provider";
import { useTheme } from "./hooks/use-theme";

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
  const { getTheme } = await getThemeSession(request);
  return {
    theme: getTheme(),
    umami: !!process.env.UMAMI_URL && {
      websiteId: process.env.UMAMI_WEBSITE_ID,
      url: process.env.UMAMI_URL,
    },
  };
};

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

export const LoadingBarContext =
  React.createContext<React.RefObject<LoadingBarRef> | null>(null);

export const App = () => {
  const data = useLoaderData();
  const [theme] = useTheme();

  const ref = React.useRef<LoadingBarRef | null>(null);

  return (
    <html lang="en" className={theme ?? ""} data-theme={theme ?? ""}>
      <head>
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body
        id="root"
        className="bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white w-full min-h-full"
      >
        <LoadingBar
          color={theme == Theme.DARK ? "#facc15" : "#4338ca"}
          ref={ref}
        />
        <LoadingBarContext.Provider value={ref}>
          <Outlet />
        </LoadingBarContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {data.umami && (
          <script
            async
            defer
            data-website-id={data.umami.websiteId}
            src={data.umami.url}
          />
        )}
      </body>
    </html>
  );
};
