import React from "react";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const queryClient = new QueryClient();

export const ThemeContext = React.createContext<{
  value: string;
  setTheme: any;
}>({ value: "dark", setTheme: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ value: theme, setTheme }}>
        <ParallaxProvider>
          <Component {...pageProps} />
        </ParallaxProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
