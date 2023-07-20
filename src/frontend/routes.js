import React from "react";
import NotFoundPage from "./components/pages/404.js";
import AuthorPage from "./components/pages/Author.js";
import AuthorsIndex from "./components/pages/AuthorsIndex.js";
import { getData } from "./utils/index.js";

const routes = [
  {
    path: "/",
    element: <AuthorsIndex />,
    loader: async ({ request }) => {
      let url = "/api/authors";
      if (request && typeof window === "undefined") {
        url = new URL(url, new URL(request.url).origin).href;
      }
      return getData(url, {
        signal: (request ?? {}).signal,
      });
    },
    errorElement: <NotFoundPage />
  },
  {
    path: "/author/:authorId",
    element: <AuthorPage />,
    loader: async ({ request, params }) => {
      let url = `/api/author/${params.authorId}`;
      if (request && typeof window === "undefined") {
        url = new URL(url, new URL(request.url).origin).href;
      }

      return getData(url, {
        signal: (request ?? {}).signal,
      });
    },
    errorElement: <NotFoundPage />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
