import * as React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { graphql } from "msw";
import { renderWithProviders } from "../../testUtils/render";
import { db } from "../../mockServer/db";
import { server } from "../../mockServer/server";
import Books from "./index";

function seedData() {
  const authors = [
    db.author.create({ name: "James Clear" }),
    db.author.create({ name: "Greg McKeown" }),
  ];

  const books = [
    db.book.create({ title: "Atomic Habits", author: authors[0] }),
    db.book.create({ title: "Essentialism", author: authors[1] }),
  ];

  return { authors, books };
}

test("should create a new book when form is submitted with valid data", async () => {
  // seed some fake data...
  seedData();

  // ... and add some specific for the test
  const authorName = "Andrzej Pilipiuk";
  db.author.create({ name: authorName });

  // render component
  renderWithProviders(<Books />);

  // wait for books to be loaded
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  // go to create book view
  userEvent.click(screen.getByRole("link", { name: "Create new book" }));

  // fill in the form
  const isbn = "1234567891011";
  const isbnInput = screen.getByRole("textbox", { name: "ISBN" });
  userEvent.type(isbnInput, isbn);

  const title = "Chronicles of Jakub Wędrowycz";
  const titleInput = screen.getByRole("textbox", { name: "Title" });
  userEvent.type(titleInput, title);

  const authorSelect = screen.getByRole("combobox", { name: "Author Id" });
  // wait for select to be enabled - options are loaded
  await waitFor(() => expect(authorSelect).toBeEnabled());
  userEvent.selectOptions(authorSelect, authorName);

  userEvent.click(screen.getByRole("button", { name: "Create book" }));

  // wait for the book to be shown - queries are invalidated which leads to refetching
  await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument());

  // assert that the results are stored in fake database
  expect(db.book.findFirst({ where: { isbn: { equals: isbn } } })).toEqual(
    expect.objectContaining({
      isbn,
      title,
      author: expect.objectContaining({ name: authorName }),
    })
  );
});

test("should show an error when book with given ISBN already exists", async () => {
  // seed some fake data to use it later
  const {
    books: [book],
    authors: [author],
  } = seedData();

  // overwrite handler to give us specific error
  const errorMessage = "Book with given ISBN already exists";
  server.use(
    graphql.mutation("CreateBook", (req, res, ctx) =>
      res(
        ctx.errors([
          {
            message: errorMessage,
            path: ["input", "isbn"],
          },
        ])
      )
    )
  );

  // render component
  renderWithProviders(<Books />);

  // wait for books to be loaded
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  // go to create book view
  userEvent.click(screen.getByRole("link", { name: "Create new book" }));

  // fill in the form
  const isbnInput = screen.getByRole("textbox", { name: "ISBN" });
  userEvent.type(isbnInput, book.isbn);

  const titleInput = screen.getByRole("textbox", { name: "Title" });
  userEvent.type(titleInput, book.title);

  const authorSelect = screen.getByRole("combobox", { name: "Author Id" });
  // wait for select to be enabled - options are loaded
  await waitFor(() => expect(authorSelect).toBeEnabled());
  userEvent.selectOptions(authorSelect, author.name);

  userEvent.click(screen.getByRole("button", { name: "Create book" }));

  // wait for the error message from the backend to be rendered
  await waitFor(() =>
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  );
});
