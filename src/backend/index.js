import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server.js";
import { authors } from "../data/authors.js";
import routes from "../frontend/routes.js";
import App from "../frontend/App.js";
import createFetchRequest from "./utils/request.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const handler = createStaticHandler(routes);

const template = ({ content }) => `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My library</title>
</head>
<body>
<div id="root">${content}</div>
<script type="text/javascript" src="/public/main.js"></script>
</body>
</html>`;

const server = fastify({ logger: true });

server.register(fastifyStatic, {
  root: resolve(__dirname, "../..", "public"),
  prefix: "/public/",
});

server.get(
  "/api/authors", // ③
  async function (req, reply) {
    return authors.map(({ id, name }) => ({ id, name }));
  }
);

server.get(
  "/api/author/:authorId", // ④
  async function (req, reply) {
    const author = authors.find(({ id }) => id === req.params.authorId);
    if (!author) {
      reply.code(404);
      return { error: "Author not found" };
    }
    return author;
  }
);

server.get("*", async (req, reply) => {
  const request = createFetchRequest(req);
  let context = await handler.query(request);

  let router = createStaticRouter(handler.dataRoutes, context);

  const content = ReactDOMServer.renderToString(
    <StaticRouterProvider router={router} context={context} />
  );

  const responseHtml = template({ content });

  const code =
    context?.errors?.code ?? context?.status ?? context?.statusCode ?? 200;
  reply.code(code).type("text/html").send(responseHtml);
});

const port = Number.parseInt(process.env.PORT) || 3000; // ⑦
const address = process.env.ADDRESS || "127.0.0.1";

server.listen({ port, host: address }, function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
