import React, { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Header from "../Header.js";
import { getData } from "../../utils/index.js";

const AuthorsIndex = () => {
  // const [authors, setAuthors] = useState([]);
  // useEffect(() => {
  //   const abort = new AbortController();
  //   getData("/api/authors", { signal: abort.signal })
  //     .then((data) => {
  //       setAuthors(data);
  //     })
  //     .catch((err) => console.log(err));

  //   return () => {
  //     abort.abort();
  //   };
  // }, []);
  const authors = useLoaderData() ?? [];
  return (
    <div>
      <Header />
      <div>
        {authors.map((author) => (
          <div key={author.id}>
            <p>
              <Link to={`/author/${author.id}`}>{author.name}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsIndex;
