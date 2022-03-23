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
        <meta name="theme-color" content="#000000" />

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
        <link rel="icon" href="/favicon.ico" />
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
