import { createCookieSessionStorage } from "@remix-run/node";
import { assertEnv } from "./env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "lerners-io",
    secure: true,
    sameSite: process.env.NODE_ENV == "production" ? "lax" : false,
    secrets: [
      process.env.NODE_ENV == "production"
        ? assertEnv("COOKIE_SECRET")
        : "secret",
    ],
    path: "/",
    httpOnly: process.env.NODE_ENV == "production",
  },
});
