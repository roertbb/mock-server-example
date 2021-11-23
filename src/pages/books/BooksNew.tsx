import * as React from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AuthorsSelect from "./components/AuthorsSelect";
import FieldWrapper from "./components/FieldWrapper";
import { booksQuery } from "./BooksListing";
import Label from "./components/Label";

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
    awaitRefetchQueries: true,
    refetchQueries: [{ query: booksQuery }],
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await createBook();

      if (res.data) {
        console.log("Book created", res.data);
        navigate("/");
      }
    } catch (error) {
      console.log("Failed to create book", error);
    }
  };

  return (
    <>
      <Link to="/">Back to listing</Link>
      <FieldWrapper>
        <Label htmlFor="title">Title</Label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FieldWrapper>
      <AuthorsSelect
        value={authorId}
        onChange={(authorId) => setAuthorId(authorId)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        Create book
      </button>
    </>
  );
}

export default BooksNew;
