import * as React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor } from "@testing-library/dom";
import { renderWithProviders } from "../../testUtils/render";
import { db } from "../../mockServer/db";
import { Author } from "../../graphql/generated-types";
import Books from "./index";

test("should allow a user to log in", async () => {
  db.books.create();
  db.books.create();
  db.books.create();

  db.authors.create();
  db.authors.create();
  const mockAuthor: Author = db.authors.create({ name: "Andrzej Pilipiuk" });

  renderWithProviders(<Books />);

  await waitForElementToBeRemoved(() => screen.getByText(/Loading/));

  userEvent.click(screen.getByRole("link", { name: "Create new book" }));

  const bookTitle = "Chronicles of Jakub Wędrowycz";
  const titleInput = screen.getByRole("textbox", { name: "Title" });
  userEvent.type(titleInput, bookTitle);

  const authorSelect = screen.getByRole("combobox");
  await waitFor(() => expect(authorSelect).toBeEnabled());
  // userEvent.selectOptions(authorSelect, mockAuthor.name);

  fireEvent.change(authorSelect, { target: { value: mockAuthor.id } });

  userEvent.click(screen.getByRole("button", { name: "Create book" }));

  await waitFor(() => expect(screen.getByText("Books")).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(bookTitle)).toBeInTheDocument());
});

// override in test
// https://mswjs.io/docs/api/setup-server/use#runtime-request-handler

// TODO: idea - refetch mutations
