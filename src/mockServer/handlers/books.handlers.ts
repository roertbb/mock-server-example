import { graphql } from "msw";
import { Book, BookInput } from "../../graphql/generated-types";
import { db } from "../db";

export const handlers = [
  graphql.query("Book", (req, res, ctx) => {
    const { id } = req.variables;

    return res(
      ctx.data({
        book: db.book.findFirst({ where: { id: { equals: id } } }),
      })
    );
  }),

  graphql.query("Books", (req, res, ctx) => {
    return res(
      ctx.data({
        books: db.book.getAll(),
      })
    );
  }),

  graphql.mutation<{ createBook: Book }, { input: BookInput }>(
    "CreateBook",
    (req, res, ctx) => {
      const { title, authorId } = req.variables.input;

      const author = db.author.findFirst({
        where: { id: { equals: authorId } },
      });

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

      const newBook = db.book.create({ title, author });

      return res(
        ctx.data({
          createBook: newBook,
        })
      );
    }
  ),
];
