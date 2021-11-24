import { oneOf, primaryKey } from "@mswjs/data";
import { v4 } from "uuid";
import faker from "faker";

export const book = {
  id: primaryKey(() => v4()),
  title: () => faker.random.words(3),
  author: oneOf("author"),
};
