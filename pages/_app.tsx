import React from "react";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import useLocalStorage from "@rehooks/local-storage";

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
  if (typeof window !== "undefined") {
    return (
      <QueryClientProvider client={queryClient}>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </QueryClientProvider>
    );
  } else {
    return <></>;
  }
}

export default App;
