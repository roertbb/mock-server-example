import { createFactory } from "typical-data";
import { v4 } from "uuid";
import faker from "faker";
import { Book } from "../../graphql/generated-types";

export const BookFactory = createFactory<Book>({
  id: () => v4(),
  title: "example name",
  author: () => ({
    id: v4(),
    name: faker.name.findName(),
  }),
});
