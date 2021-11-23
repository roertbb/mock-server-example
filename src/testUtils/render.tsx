import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "../ApolloClient";

export function renderWithProviders(ui: React.ReactNode) {
  return render(
    <ApolloProvider client={client}>
      <BrowserRouter>{ui}</BrowserRouter>
    </ApolloProvider>
  );
}
