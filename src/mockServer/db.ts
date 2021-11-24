import { factory } from "@mswjs/data";
import { author } from "./factories/authors.factory";
import { book } from "./factories/books.factory";

export const db = factory({
  author,
  book,
});
