import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { isTheme } from "~/hooks/use-theme";
import { getThemeSession } from "~/utils/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const text = await request.text();
  const theme = new URLSearchParams(text).get("theme");

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `Invalid theme: ${theme}`,
    });
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  );
};

export const loader: LoaderFunction = () => redirect("/", { status: 404 });
