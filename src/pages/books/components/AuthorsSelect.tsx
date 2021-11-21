import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { Author, Query } from "../../../graphql/generated-types";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";

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
    <FormControl id="authorId" isRequired>
      <FormLabel>Author Id</FormLabel>
      <Select
        placeholder="Select author"
        disabled={loading}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {data?.authors?.map((author: Author) => (
          <option value={author.id!} key={author.id!}>
            {author.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default AuthorsSelect;
