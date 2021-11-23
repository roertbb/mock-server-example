import * as React from "react";
import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Query } from "../../graphql/generated-types";

export const booksQuery = gql`
  query Books {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

function BooksListing() {
  const { data, loading, error } =
    useQuery<{ books: Query["books"] }>(booksQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while fetching books data: ({error.message})</p>;
  }

  return (
    <>
      <h1>Books</h1>
      <ul>
        {data?.books?.map((book) => (
          <li key={book.id}>
            <Link to={`/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/new">
        <button type="button">Create new book</button>
      </Link>
    </>
  );
}

export default BooksListing;
