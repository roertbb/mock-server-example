import { createFactory } from "typical-data";
import { v4 } from "uuid";
import faker from "faker";
import { Author } from "../../graphql/generated-types";

export const AuthorFactory = createFactory<Author>({
  id: () => v4(),
  name: () => faker.name.findName(),
});
