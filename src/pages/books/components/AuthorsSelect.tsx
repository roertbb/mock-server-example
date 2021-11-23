import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Author, Query } from "../../../graphql/generated-types";
import FieldWrapper from "./FieldWrapper";
import Label from "./Label";

const authorsQuery = gql`
  query Authors {
    authors {
      id
      name
    }
  }
`;

type AuthorsSelectProps = {
  value?: string;
  onChange: (authorId: string) => void;
};

function AuthorsSelect({ value, onChange }: AuthorsSelectProps) {
  const { data, loading } =
    useQuery<{ authors: Query["authors"] }>(authorsQuery);

  return (
    <FieldWrapper>
      <Label htmlFor="authorId">Author Id</Label>
      <select
        id="authorId"
        placeholder="Select author"
        disabled={loading}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select option</option>
        {data?.authors?.map((author: Author) => (
          <option value={author.id!} key={author.id!}>
            {author.name}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export default AuthorsSelect;
