import React from "react";
import type { AppProps } from "next/app";
import { ParallaxProvider } from "react-scroll-parallax";
import "../styles/globals.css";

export const ThemeContext = React.createContext<{
  value: string;
  setTheme: any;
}>({ value: "dark", setTheme: () => {} });

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = React.useState("dark");

  return (
    <ThemeContext.Provider value={{ value: theme, setTheme }}>
      <ParallaxProvider>
        <Component {...pageProps} />
      </ParallaxProvider>
    </ThemeContext.Provider>
  );
}

export default MyApp;
