import { createCookieSessionStorage } from "@remix-run/node";
import { Theme } from "~/components/theme-provider";
import { isTheme } from "~/hooks/use-theme";
import { assertEnv } from "./env.server";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    secure: true,
    secrets: [assertEnv("COOKIE_SECRET")],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export const getThemeSession = async (request: Request) => {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const theme = session.get("theme");
      return isTheme(theme) ? theme : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
};
