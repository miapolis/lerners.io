///////////////////////////////////////////////////////////////////////////////////////////
/// Adapted from https://www.mattstobbs.com/remix-dark-mode ///////////////////////////////
/// and https://github.com/kentcdodds/kentcdodds.com/blob/main/app/utils/theme-provider.tsx
///////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { useFetcher } from "@remix-run/react";
import { useTheme } from "~/hooks/use-theme";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}
export const themes = Object.values(Theme);

type ThemeContextType = [
  Theme | null,
  React.Dispatch<React.SetStateAction<Theme | null>>
];
export const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

const prefersLightQuery = `(prefers-color-scheme: light)`;
const getPreferredTheme = () =>
  window.matchMedia(prefersLightQuery).matches ? Theme.LIGHT : Theme.DARK;

export interface ThemeProviderProps {
  children: React.ReactNode;
  specifiedTheme: Theme | null;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  specifiedTheme,
}) => {
  const [theme, setTheme] = React.useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      }
      return null;
    }

    if (typeof window === "undefined") {
      return null;
    }

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();
  const mountRun = React.useRef(false);

  React.useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) return;

    persistTheme.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightQuery);

    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

const clientThemeCode = `
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersLightQuery)}).matches
    ? 'light'
    : 'dark';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (!themeAlreadyApplied) {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  }
})();
`;

export const PreventFlashOnWrongTheme = ({
  ssrTheme,
}: {
  ssrTheme: boolean;
}) => {
  const [theme] = useTheme();

  return (
    <>
      <meta
        name="color-scheme"
        content={theme === Theme.DARK ? "dark light" : "light dark"}
      />
      {ssrTheme ? null : (
        <script
          dangerouslySetInnerHTML={{
            __html: clientThemeCode,
          }}
        />
      )}
    </>
  );
};
