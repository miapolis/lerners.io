import React from "react";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { QueryClient, QueryClientProvider } from "react-query";
import useLocalStorage from "@rehooks/local-storage";
import Head from "next/head";

import "../styles/globals.css";

const queryClient = new QueryClient();

export const useTheme = () => {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "theme",
    prefersDark ? "dark" : "light"
  );

  const toggleTheme = React.useMemo(() => {
    if (theme == "dark") {
      return () => setTheme("light");
    } else {
      return () => setTheme("dark");
    }
  }, [theme, setTheme]);

  return { theme, toggleTheme, dark: theme == "dark" };
};

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Ethan Lerner</title>
        <meta name="title" content="Ethan Lerner" />
        <meta
          name="description"
          content="A website probably related to and/or about Ethan Lerner."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lerners.io/" />
        <meta property="og:title" content="Ethan Lerner" />
        <meta
          property="og:description"
          content="A website probably related to and/or about Ethan Lerner."
        />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lerners.io/" />
        <meta property="twitter:title" content="Ethan Lerner" />
        <meta
          property="twitter:description"
          content="A website probably related to and/or about Ethan Lerner."
        />
        <meta property="twitter:image" content="" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {typeof window !== "undefined" ? (
        <QueryClientProvider client={queryClient}>
          <ParallaxProvider>
            <Component {...pageProps} />
          </ParallaxProvider>
        </QueryClientProvider>
      ) : null}
    </>
  );
};

export default App;
