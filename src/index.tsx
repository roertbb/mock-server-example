import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./ApolloClient";
import { db } from "./mockServer/db";
import Books from "./pages/books";

// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mockServer/browser");

  db.book.create({
    title: "Atomic Habits",
    author: db.author.create({ name: "James Clear" }),
  });
  db.book.create({
    title: "Essentialism",
    author: db.author.create({ name: "Greg McKeown" }),
  });
  db.book.create({
    title: "Chronicles of Jakub Wędrowycz",
    author: db.author.create({ name: "Andrzej Pilipuik" }),
  });

  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
