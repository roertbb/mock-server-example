import { graphql } from "msw";
import { Book, BookInput } from "../../graphql/generated-types";
import { db } from "../db";

export const handlers = [
  graphql.query("Book", (req, res, ctx) => {
    const { id } = req.variables;

    return res(
      ctx.data({
        book: db.books.find((book) => book.id === id),
      })
    );
  }),

  graphql.query("Books", (req, res, ctx) => {
    return res(
      ctx.data({
        books: db.books.all(),
      })
    );
  }),

  graphql.mutation<{ createBook: Book }, { input: BookInput }>(
    "CreateBook",
    (req, res, ctx) => {
      const { title, authorId } = req.variables.input;

      const author = db.authors.find((author) => author.id === authorId);

      if (!author) {
        return res(
          ctx.errors([
            {
              message: "Author not found",
              extensions: {
                id: authorId,
              },
            },
          ])
        );
      }

      const newBook = db.books.create({ title, author });

      return res(
        ctx.data({
          createBook: newBook,
        })
      );
    }
  ),
];
