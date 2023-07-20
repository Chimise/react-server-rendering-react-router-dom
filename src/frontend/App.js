import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./components/pages/404.js";
import AuthorPage from "./components/pages/Author.js";
import AuthorsIndex from "./components/pages/AuthorsIndex.js";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthorsIndex />} path="/" />
      <Route element={<AuthorPage />} path="/author/:authorId" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
};

export default App;
