import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Box, Link } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import AuthorsSelect from "./components/AuthorsSelect";
import { bookQuery } from "./BooksDetails";
import { booksQuery } from "./BooksListing";

const createBookMutation = gql`
  mutation CreateBook($input: BookInput) {
    createBook(input: $input) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

function BooksNew() {
  const [title, setTitle] = React.useState("");
  const [authorId, setAuthorId] = React.useState<string | undefined>(undefined);

  const [createBook, { loading }] = useMutation(createBookMutation, {
    variables: { input: { title, authorId } },
    refetchQueries: [bookQuery, booksQuery],
  });

  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const res = await createBook();

      if (res.data) {
        toast({ title: "Book created", status: "success" });
        navigate("/");
      }
    } catch (error) {
      toast({ title: "Failed to create book", status: "error" });
    }
  };

  return (
    <>
      <Link as={RouterLink} to="/">
        Back to listing
      </Link>
      <Box mb={4}>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <AuthorsSelect
          value={authorId}
          onChange={(authorId) => setAuthorId(authorId)}
        />
      </Box>
      <Button onClick={handleSubmit} disabled={loading}>
        Create book
      </Button>
    </>
  );
}

export default BooksNew;
