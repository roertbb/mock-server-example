import * as React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { renderWithProviders } from "../../testUtils/render";
import { db } from "../../mockServer/db";
import Books from "./index";

test("should allow a user to log in", async () => {
  const authorName = "Andrzej Pilipiuk";
  const mockAuthor = db.author.create({ name: authorName });
  db.author.create();
  db.author.create();

  db.book.create({ title: "some book", author: mockAuthor });
  db.book.create({ author: mockAuthor });
  db.book.create({ author: mockAuthor });

  renderWithProviders(<Books />);

  // wait for books to be loaded
  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  // go to create book view
  userEvent.click(screen.getByRole("link", { name: "Create new book" }));

  // fill in form
  const bookTitle = "Chronicles of Jakub Wędrowycz";
  const titleInput = screen.getByRole("textbox", { name: "Title" });
  userEvent.type(titleInput, bookTitle);

  const authorSelect = screen.getByRole("combobox", { name: "Author Id" });
  // wait for select to be enabled - options are loaded
  await waitFor(() => expect(authorSelect).toBeEnabled());
  userEvent.selectOptions(authorSelect, authorName);

  userEvent.click(screen.getByRole("button", { name: "Create book" }));

  // wait for the book to be shown - due to apollo query invalidation the results are refetched
  await waitFor(() => expect(screen.getByText(bookTitle)).toBeInTheDocument());

  // assert that the results are stored in fake database
  expect(
    db.book.findFirst({ where: { title: { equals: bookTitle } } })
  ).toEqual(
    expect.objectContaining({
      title: bookTitle,
      author: expect.objectContaining({ name: authorName }),
    })
  );
});
