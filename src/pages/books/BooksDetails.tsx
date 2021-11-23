import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Query } from "../../graphql/generated-types";

export const bookQuery = gql`
  query Book($id: ID) {
    book(id: $id) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

function BooksDetails() {
  const { bookId } = useParams();
  const { data, loading, error } = useQuery<{ book: Query["book"] }>(
    bookQuery,
    { variables: { id: bookId } }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while fetching books data: ({error.message})</p>;
  }

  return (
    <>
      <Link to="/">Back to listing</Link>
      <h1>{data?.book.title}</h1>
      <p>Author: {data?.book.author.name}</p>
    </>
  );
}

export default BooksDetails;
