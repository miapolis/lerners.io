import express from "express";
import path from "path";
import { createRequestHandler } from "@remix-run/express";

const PROD = process.env.NODE_ENV === "production";

const app = express();

app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(express.static("public", { maxAge: "1h" }));

app.use(
  "/studio/*",
  express.static("public/studio/index.html", { maxAge: "1h" })
);
app.disable("x-powered-by");

const BUILD_DIR = path.join(process.cwd(), "build");

app.all(
  "*",
  PROD
    ? createRequestHandler({ build: require(BUILD_DIR) })
    : (...args) => {
        purgeRequiredCache();
        const requestHandler = createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        });
        return requestHandler(...args);
      }
);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  require(BUILD_DIR);
  console.info("App is ready | Listening on port", port);
});

const purgeRequiredCache = () => {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
};
