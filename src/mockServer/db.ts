import { createDatabase } from "typical-data";
import { AuthorFactory } from "./factories/authors.factory";
import { BookFactory } from "./factories/books.factory";

export const db = createDatabase({
  factories: {
    books: BookFactory,
    authors: AuthorFactory,
  },
});

export function cleanUp() {
  db.reset();
}
