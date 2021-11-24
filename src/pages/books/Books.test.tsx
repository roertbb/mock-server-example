import * as React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/dom";
import { renderWithProviders } from "../../testUtils/render";
import { db } from "../../mockServer/db";
import Books from "./index";

test("should allow a user to log in", async () => {
  db.book.create({
    title: "Atomic Habits",
    author: db.author.create({ name: "James Clear" }),
  });
  db.book.create({
    title: "Essentialism",
    author: db.author.create({ name: "Greg McKeown" }),
  });

  const authorName = "Andrzej Pilipiuk";
  db.author.create({ name: authorName });

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
