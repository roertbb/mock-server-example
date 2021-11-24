import { graphql } from "msw";
import { db } from "../db";

export const handlers = [
  graphql.query("Author", (req, res, ctx) => {
    const { id } = req.variables;

    return res(
      ctx.data({
        author: db.author.findFirst({ where: { id: { equals: id } } }),
      })
    );
  }),

  graphql.query("Authors", (req, res, ctx) => {
    return res(
      ctx.data({
        authors: db.author.getAll(),
      })
    );
  }),
];
