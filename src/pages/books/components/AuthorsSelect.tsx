import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Author, Query } from "../../../graphql/generated-types";
import FieldWrapper from "./FieldWrapper";
import Label from "./Label";
import { ErrorMessage, useField } from "formik";

const authorsQuery = gql`
  query Authors {
    authors {
      id
      name
    }
  }
`;

type AuthorsSelectProps = {
  id: string;
  name: string;
};

function AuthorsSelect({ id, ...props }: AuthorsSelectProps) {
  const [field] = useField(props);

  const { data, loading } =
    useQuery<{ authors: Query["authors"] }>(authorsQuery);

  return (
    <FieldWrapper>
      <Label htmlFor="authorId">Author Id</Label>
      <select id={id} {...field} placeholder="Select author" disabled={loading}>
        <option value="">Select option</option>
        {data?.authors?.map((author: Author) => (
          <option value={author.id!} key={author.id!}>
            {author.name}
          </option>
        ))}
      </select>
      <ErrorMessage name="authorId" component="div" />
    </FieldWrapper>
  );
}

export default AuthorsSelect;
