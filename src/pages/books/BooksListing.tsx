import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Box, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/layout";
import { Query } from "../../graphql/generated-types";
import { Button } from "@chakra-ui/button";
import { Spinner } from "@chakra-ui/spinner";

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
    return <Spinner />;
  }

  if (error) {
    return <p>Error while fetching books data: ({error.message})</p>;
  }

  return (
    <>
      <Box mb={4}>
        <Heading mb={4}>Books</Heading>
        <UnorderedList>
          {data?.books?.map((book) => (
            <Link as={RouterLink} to={`/${book.id}`} key={book.id}>
              <ListItem>{book.title}</ListItem>
            </Link>
          ))}
        </UnorderedList>
      </Box>

      <Button as={RouterLink} to="/new">
        Create new book
      </Button>
    </>
  );
}

export default BooksListing;
