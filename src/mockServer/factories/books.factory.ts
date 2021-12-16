import { oneOf, primaryKey } from "@mswjs/data";
import faker from "faker";

export const book = {
  isbn: primaryKey(() => String(faker.datatype.number(9999999999999))),
  title: () => faker.random.words(3),
  author: oneOf("author"),
};
