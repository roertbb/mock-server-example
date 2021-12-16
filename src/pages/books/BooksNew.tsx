import * as React from "react";
import { ApolloError, gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AuthorsSelect from "./components/AuthorsSelect";
import FieldWrapper from "./components/FieldWrapper";
import { booksQuery } from "./BooksListing";
import Label from "./components/Label";
import { ErrorMessage, Field, Form, Formik } from "formik";

const createBookMutation = gql`
  mutation CreateBook($input: BookInput) {
    createBook(input: $input) {
      isbn
      title
      author {
        id
        name
      }
    }
  }
`;

const initialValues = {
  isbn: "",
  title: "",
  authorId: "",
};

function BooksNew() {
  const [createBook] = useMutation(createBookMutation, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: booksQuery }],
  });

  const navigate = useNavigate();

  return (
    <>
      <Link to="/">Back to listing</Link>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await createBook({ variables: { input: values } });

            if (res.data) {
              navigate("/");
            }
          } catch (error) {
            if (error instanceof ApolloError) {
              error.graphQLErrors.forEach(({ path, message }) => {
                const field = path?.[path?.length - 1];
                if (field) {
                  setErrors({ [field]: message });
                }
              });
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FieldWrapper>
              <Label htmlFor="isbn">ISBN</Label>
              <Field id="isbn" name="isbn" type="text" />
              <ErrorMessage name="isbn" component="div" />
            </FieldWrapper>

            <FieldWrapper>
              <Label htmlFor="title">Title</Label>
              <Field id="title" name="title" type="text" />
              <ErrorMessage name="title" component="div" />
            </FieldWrapper>

            <AuthorsSelect id="authorId" name="authorId" />

            <button type="submit" disabled={isSubmitting}>
              Create book
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default BooksNew;
