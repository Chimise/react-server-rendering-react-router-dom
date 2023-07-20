import React, { useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import NotFoundPage from "./404.js";
import Header from "../Header.js";
import { getData } from "../../utils/index.js";

const AuthorPage = () => {
  const { authorId } = useParams();
  // const [author, setAuthor] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // // const author = useLoaderData();

  // useEffect(() => {
  //   let abort;
  //   if(authorId) {
  //     abort = new AbortController();
  //     getData(`/api/author/${authorId}`, {signal: abort.signal}).then((data) => {
  //       setAuthor(data);
  //     }).catch(err => console.log(err)).finally(() => setIsLoading(false));
  //   }

  //   return () => {
  //     if(abort) {
  //       abort.abort();
  //     }
  //   }
  // }, [authorId])

  // if(isLoading) {
  //   return <div>Author is loading</div>
  // }

  const author = useLoaderData();

  if (!author) {
    return <NotFoundPage error="Author not found" />;
  }

  return <div>
    <Header />
    <h2>{author.id}</h2>
    <p>{author.bio}</p>
    <ul>
      {author.books.map(book => (<li key={book.id}>{book.title} ({book.year})</li>))}
    </ul>
  </div>;
};

export default AuthorPage;

