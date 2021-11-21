import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { client } from "./ApolloClient";
import { db } from "./mockServer/db";
import Books from "./pages/books";

// Start the mocking conditionally.
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mockServer/browser");

  const author = db.authors.create({ name: "Andrzej Pilipuik" });
  db.books.create({
    title: "Chronicles of Jakub Wędrowycz",
    author,
  });

  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Books />
        </BrowserRouter>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
