import { createCookieSessionStorage } from "@remix-run/node";
import { assertEnv } from "./env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "lerners-io",
    secure: true,
    sameSite: "lax",
    secrets: [assertEnv("COOKIE_SECRET")],
    path: "/",
    httpOnly: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
